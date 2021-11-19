import { FaShopify, FaBuilding, FaMoneyBillWave,
     FaRegUser, FaRegPlusSquare,FaBalanceScale} from 'react-icons/fa';


let styleIcon = {width:'40px',height:'40px'}

export const footerButtons = [
    {
        id: 1,
        url: '/',
        text: 'Əsas',
        icon: <FaBuilding style={styleIcon}/>
    },
    {
        id: 2,
        url: '/sales',
        text: 'Satışlar',
        icon: <FaBalanceScale style={styleIcon}/>
    },
    {
        id: 3,
        url: '/purchases',
        text: 'Alışlar',
        icon: <FaShopify style={styleIcon}/>
    },
    {
        id: 4,
        url: '/finance',
        text: 'Maliyyə',
        icon: <FaMoneyBillWave style={styleIcon}/>
    },
]
export const containerButtons = 
    {
    main: [{
            id: 1,
            url: '/indicators',
            text: 'Göstəricilər',
            icon: <FaShopify style={styleIcon} />
            },
            {
            id: 2,
            url: '/products',
            text: 'Mehsullar',
            icon: <FaRegPlusSquare style={styleIcon} />
            }],
    sales: [{
        id: 1,
        url: '/yeni_satış',
        text: 'Yeni satış',
        icon: <FaRegUser style={styleIcon} />
        },
        {
        id: 2,
        url: '/sales_documents',
        text: 'Satish senedleri',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    purchases: [{
        id: 1,
        url: '/yeni_alış',
        text: 'Yeni alış',
        icon: <FaRegUser style={styleIcon} />
        },
        {
        id: 2,
        url: '/purchase_documents',
        text: 'Alış sənədləri',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    finance: [{
        id: 1,
        url: '/income',
        text: 'Mədaxil',
        icon: <FaRegUser style={styleIcon} />
        },
        {
        id: 2,
        url: '/expenditure',
        text: 'Məxaric',
        icon: <FaRegPlusSquare style={styleIcon} />
        },
        {
        id: 3,
        url: '/payments',
        text: 'Ödənişlər',
        icon: <FaRegPlusSquare style={styleIcon} />
        },
        {
        id: 4,
        url: '/debts',
        text: 'Borclar',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    products: [{
        id: 1,
        url: '/new_product',
        text: 'Yeni Məhsul',
        icon: <FaRegPlusSquare style={styleIcon} />
        },
        {
        id: 2,
        url: '/new_group',
        text: 'Yeni Qrup',
        icon: <FaRegPlusSquare style={styleIcon} />
        },
        {
        id: 3,
        url: '/products_list',
        text: 'Məhsular',
        icon: <FaRegPlusSquare style={styleIcon} />
        },
        {
        id: 4,
        url: '/warehouse_balance',
        text: 'Anbar qalığı',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    newSale: [{
        id: 1,
        url: '/choose_customer',
        text: 'Müştəri seç',
        icon: <FaRegUser style={styleIcon} />
        },
        {
        id: 2,
        url: '/new_customer',
        text: 'Yeni müştəri',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    newPurchase: [{
        id: 1,
        url: '/choose_customer',
        text: 'Müştəri seç',
        icon: <FaRegUser style={styleIcon} />
        },
        {
        id: 2,
        url: '/new_customer',
        text: 'Müştəri yarat',
        icon: <FaRegPlusSquare style={styleIcon} />
        }],
    }
    
