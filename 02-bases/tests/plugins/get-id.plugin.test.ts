import { getUUID } from '../../src/plugins/get-id.plugin'

describe('plugins/get-id.plugin.ts', () => {
  it('getUUID should return a UUID', () => {
    const uuid = getUUID()
    expect(typeof uuid).toBe('string')
    expect(uuid.length).toBe(36)
  })
})
