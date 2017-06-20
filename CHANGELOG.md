## [2.0.0]
### Added
- This package now output formated phone number, for exemple +33 7 70 48 29 49 will become +33770482948
```js
const schema = phoneRule.phone().validate()
const validation = Joi.validate('+33 7 70 48 29 49', schema)
validation.value === '+33770482949' // true
```
### Changed
- This package now handle every phone number as long as it's input respect E164
https://en.wikipedia.org/wiki/List_of_country_calling_codes
for exemple 07 70 48 29 49 will return an error
```js
const schema = phoneRule.phone().validate()
const validation = Joi.validate('07 70 48 29 49', schema)
!!validation.error // true
```

## [1.0.0]
### Added
- Initial release
