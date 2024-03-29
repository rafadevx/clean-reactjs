import { SetStorageMock } from "@/data/test"
import { faker } from '@faker-js/faker'
import { waitFor } from "@testing-library/react"
import { LocalSaveAccessToken } from "./local-save-access-token"

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  // test('Should throw if SetStorage throws', async () => {
  //   const { sut, setStorageMock } = makeSut()
  //   jest.spyOn(setStorageMock, 'set').mockReturnValueOnce(Promise.reject(new Error()))
  //   const promise = sut.save(faker.datatype.uuid())
  //   await expect(promise).rejects.toThrow(new Error())
  // })
})