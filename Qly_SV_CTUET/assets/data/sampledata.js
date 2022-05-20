const SAMPLE_DATA =[
    {
        id: 'sp001',
        gia: 20000,
        soluong: 6,
        tensp: 'My cay'
    },

    {
        id: 'sp002',
        gia: 10000,
        soluong: 6,
        tensp: 'Dang xuat'
    },
    {
        id: 'sp003',
        gia: 10000,
        soluong: 6,
        tensp: 'My cay'
    },
    {
        id: 'sp004',
        gia: 10000,
        soluong: 7,
        tensp: 'My cay'
    },
    {
        id: 'sp005',
        gia: 10000,
        soluong: 7,
        tensp: 'My cay'
    }
]

export function getProducts(){
    return SAMPLE_DATA;
}


export function getProduct(id){
    return SAMPLE_DATA.find((product) => product.id == id)
}