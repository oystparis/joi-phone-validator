import * as sourceMapSupport from 'source-map-support'

sourceMapSupport.install()

import * as PhoneNumbers from 'google-libphonenumber'
import * as Joi from 'joi'

const phoneNumberUtil = PhoneNumbers.PhoneNumberUtil.getInstance()
const PhoneNumberType = PhoneNumbers.PhoneNumberType
const PNF = PhoneNumbers.PhoneNumberFormat

export default Joi.extend({
  base: Joi.string(),
  language: {
    mobile: 'needs to be a mobile phone number',
    validate: 'needs to be a valid phone number according to E.164 international format'
  },
  name: 'phone',
  // Weak Joi typings :(
  pre (this: any, value: any, state: any, options: any) {
    if (options.convert) {
      try {
        const phoneNumber = phoneNumberUtil.parse(value)
        return phoneNumberUtil.format(phoneNumber, PNF.E164)
      } catch (e) {
        return this.createError('phone', { v: value }, state, options)
      }
    }
    return value
  },
  rules: [{
    name: 'mobile',
    // Weak Joi typings bis :(
    validate (this: any, _: any, value: any, state: any, options: any) {
      try {
        const { MOBILE, FIXED_LINE_OR_MOBILE } = PhoneNumberType
        const phoneNumber = phoneNumberUtil.parse(value)
        const isMobile = [MOBILE, FIXED_LINE_OR_MOBILE].includes(phoneNumberUtil.getNumberType(phoneNumber))
        if (!isMobile) {
          return this.createError('phone.mobile', { v: value }, state, options)
        }
        return value
      } catch (e) {
        return this.createError('phone.mobile', { v: value }, state, options)
      }
    }
  }, {
    name: 'validate',
    // Weak Joi typings ter :(
    validate (this: any, _: any, value: any, state: any, options: any) {
      try {
        const phoneNumber = phoneNumberUtil.parse(value)
        const isValid = phoneNumberUtil.isValidNumber(phoneNumber)
        if (!isValid) {
          return this.createError('phone.validate', { v: value }, state, options)
        }
        return value
      } catch (e) {
        return this.createError('phone.validate', { v: value }, state, options)
      }
    }
  }]
})
