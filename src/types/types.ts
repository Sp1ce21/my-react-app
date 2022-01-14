export type photosType = {
    small: string | null
    large: string | null
}

export type itemsType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type usersType = {
    items: Array<itemsType>
    totalCount: number
    error: string
}