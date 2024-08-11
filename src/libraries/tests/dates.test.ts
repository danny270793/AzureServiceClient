import dates from '../dates'
import { describe, it } from 'node:test'
import assert from 'node:assert'

export default describe('dates', () => {
    describe('twoDigits', () => {
        it('should add 0 to left', () => {
            assert.equal(dates.twoDigits(3), '03')
        })
        it('should return the same', () => {
            assert.equal(dates.twoDigits(13), '13')
        })
    })
})
