import React, { PureComponent } from 'react'
import equal from 'fast-deep-equal'

export default function transitionProps({ propsToTransition }) {
  return Wrapped =>
    class TransitionProps extends PureComponent {
      constructor(props) {
        super(props)

        // props transitioning (prop key => timer id)
        this.transProps = {}

        // props post-transition
        this.postTransProps = {}

        this.state = {
          propsToRender: props,
        }
      }
      transitionProps({ pre, post }) {
        const toTransition = propsToTransition({ pre, post })
        const normalProps = {}
        Object.keys(pre).forEach(key => {
          // only transition props that have changed
          if (
            toTransition[key] &&
            !(toTransition[key].compare || equal)({
              pre: pre[key],
              post: post[key],
            }) &&
            (!toTransition[key].exclude ||
              !toTransition[key].exclude({
                pre: pre[key],
                post: post[key],
              }))
          ) {
            // store post transition props to pass on
            this.postTransProps[key] = pre[key]
            // reset timer in case prop is already transitioning
            clearTimeout(this.transProps[key])
            // start transition timer
            this.transProps[key] = setTimeout(() => {
              // remove the prop from the queue and post-trans props
              delete this.transProps[key]
              delete this.postTransProps[key]
              // update the prop
              this.setState({
                propsToRender: {
                  ...this.state.propsToRender,
                  [key]: post[key],
                },
              })
            }, toTransition[key].duration)
          } else {
            // non transition props get updated immediately
            normalProps[key] = post[key]
          }
        })
        // update non-transitioning props now
        this.setState({
          propsToRender: {
            ...this.state.propsToRender,
            ...normalProps,
          },
        })
      }
      componentWillReceiveProps(nextProps) {
        this.transitionProps({ pre: this.props, post: nextProps })
      }
      render() {
        return (
          <Wrapped
            {...this.state.propsToRender}
            transitions={Object.keys(this.props).reduce(
              (t, k) => ({
                ...t,
                [k]: {
                  isActive: Boolean(this.transProps[k]),
                  nextValue: this.postTransProps[k],
                },
              }),
              {}
            )}
            postTransitionProps={this.postTransProps}
          />
        )
      }
    }
}
