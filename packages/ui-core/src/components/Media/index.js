/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Container from '@instructure/ui-container/lib/components/Container'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import themeable from '@instructure/ui-themeable'
import { omitProps } from '@instructure/ui-utils/lib/react/passthroughProps'
import CustomPropTypes from '@instructure/ui-utils/lib/react/CustomPropTypes'

import styles from './styles.css'
import theme from './theme'

/**
---
category: components/utilities
---
**/
@themeable(theme, styles)
class Media extends Component {
  static propTypes = {
    /**
    * the media object
    */
    children: PropTypes.node.isRequired,
    /**
    * the media title
    */
    title: PropTypes.string,
    /**
    * the media description
    */
    description: PropTypes.string,
    /**
    * how should the title and description align
    */
    alignContent: PropTypes.oneOf(['top', 'center']),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    alignContent: 'center'
  }

  render () {
    const props = omitProps(this.props, Media.propTypes, ['padding'])

    const classes = {
      className: classnames({
        [styles.root]: true,
        [styles[this.props.alignContent]]: true
      })
    }
    return (
      <Container
        {...props}
        {...classes}
        as="figure"
        margin={this.props.margin}
        size={this.props.size}
      >
        <div className={styles.figure}>
          {this.props.children}
        </div>
        <figcaption className={styles.caption}>
          {
            this.props.title && (
              <Heading level="h3">
                <span className={styles.title}>
                  {this.props.title}
                </span>
              </Heading>
            )
          }
          {
            this.props.description && (
              <div className={styles.description}>
                {this.props.description}
              </div>
            )
          }
        </figcaption>
      </Container>
    )
  }
}

export default Media
