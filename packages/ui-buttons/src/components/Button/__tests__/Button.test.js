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

import React from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Button from '../index'

describe('<Button/>', () => {
  const testbed = new Testbed(<Button>Hello World</Button>)

  it('should render the children as button text', () => {
    const subject = testbed.render()

    expect(subject.text())
      .to.equal('Hello World')
  })

  it('should render a button', () => {
    const subject = testbed.render()

    expect(subject.tagName())
      .to.equal('BUTTON')
  })

  it('should render a link styled as a button if href is provided', () => {
    const subject = testbed.render({
      href: 'example.html'
    })

    expect(subject.tagName()).to.equal('A')
    expect(subject.find('[href="example.html"]')).to.have.length(1)
  })

  it('should render designated tag if `as` prop is specified', () => {
    const subject = testbed.render({
      as: 'span',
      onClick: testbed.stub()
    })

    expect(subject.tagName())
      .to.equal('SPAN')

    expect(subject.getAttribute('role'))
      .to.equal('button')

    expect(subject.getAttribute('tabIndex'))
      .to.equal('0')
  })

  it('should pass down the type prop to the button element', () => {
    const subject = testbed.render({
      type: 'submit'
    })

    expect(subject.find('button[type="submit"]')).to.be.present
  })

  it('should not allow padding as a property', () => {
    const subject = testbed.render({
      padding: 'medium large small large'
    })
    expect(subject.find(Container).props().padding).to.not.exist
  })

  it('focuses with the focus helper', () => {
    const subject = testbed.render()

    subject.instance().focus()

    expect(subject.instance().focused).to.be.true
    expect(subject.focused()).to.be.true
  })

  it('should provide a buttonRef prop', () => {
    const buttonRef = testbed.stub()
    const subject = testbed.render({
      buttonRef
    })

    expect(buttonRef).to.have.been.calledWith(subject.find('button').unwrap())
  })

  describe('onClick', () => {
    it('should call onClick when clicked', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is readOnly', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is disabled and an href prop is provided', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        href: 'example.html',
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is readOnly and an href prop is provided', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        href: 'example.html',
        onClick
      })

      subject.simulate('click')

      expect(onClick).to.not.have.been.called
    })

    it('should call onClick when space key is pressed if href is provided', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        href: '#',
        onClick
      })

      subject.keyDown('space')

      expect(onClick).to.have.been.called
    })

    it('should call onClick when enter key is pressed when not a button or link', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        as: 'span',
        onClick
      })

      subject.keyDown('enter')

      expect(onClick).to.have.been.called
    })

    it('should not call onClick when button is disabled and space key is pressed', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        disabled: true,
        onClick
      })

      subject.keyDown('space')

      expect(onClick).to.not.have.been.called
    })

    it('should not call onClick when button is readOnly and space key is pressed', () => {
      const onClick = testbed.stub()

      const subject = testbed.render({
        readOnly: true,
        onClick
      })

      subject.keyDown('space')

      expect(onClick).to.not.have.been.called
    })
  })

  describe('for a11y', () => {
    it('should meet standards', (done) => {
      const subject = testbed.render()

      subject.should.be.accessible(done)
    })

    describe('when disabled', () => {
      it('sets the aria-disabled attribute', () => {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })

      it('sets the disabled attribute so that the button is not in tab order', () => {
        const subject = testbed.render({
          disabled: true
        })

        expect(subject.getAttribute('disabled')).to.exist
      })

      it('sets the aria-disabled attribute when an href is provided', () => {
        const subject = testbed.render({
          disabled: true,
          href: 'example.html'
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })
    })

    describe('when readOnly', () => {
      it('sets the aria-disabled attribute', () => {
        const subject = testbed.render({
          readOnly: true
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })

      it('sets the readOnly attribute so that the button is not in tab order', () => {
        const subject = testbed.render({
          readOnly: true
        })

        expect(subject.getAttribute('disabled')).to.exist
      })

      it('sets the aria-disabled attribute when an href is provided', () => {
        const subject = testbed.render({
          readOnly: true,
          href: 'example.html'
        })

        expect(subject.getAttribute('aria-disabled')).to.exist
      })
    })
  })
})
