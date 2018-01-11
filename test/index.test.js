const expect = require('expect')
const {generateMessage , generateLocationMessage} = require('../utils/message')

describe('generateMessage', () => {
  it('Should generate object',() => {
    var from = 'yk'
    var text = 'some message'

    var message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from, text})
  })

  it('Should create a url with the location', () => {
    var from = 'cv'
    var latitude = '6.2639007'
    var longitude = '-75.57008139'
    var url = 'http://www.google.com/maps?q=6.2639007,-75.57008139'
    var message = generateLocationMessage(from,latitude,longitude)

    expect(message.from).toBe(from)
    expect(typeof message.createdAt).toBe('number')
    //expect(url.url).
    expect(message).toMatchObject({from, url})
  })
})