import { MenuItem, RestaurantInfo, PromoCode } from "./types";

export const DEFAULT_RESTAURANT_INFO: RestaurantInfo = {
  name: "مطعم ومقهى سيلست Celeste",
  branch: "فرع بورسعيد",
  address: "طرح البحر - مجمع المطاعم - فرع بورسعيد",
  phone: "01012345678",
  workingHours: "من 8:00 ص إلى 4:00 بعد منتصف الليل",
};

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo_welcome10',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 100,
    isActive: true,
    expiryDate: '2026-12-31',
    usageCount: 15,
    maxUses: 100
  },
  {
    id: 'promo_celeste50',
    code: 'CELESTE50',
    type: 'fixed',
    value: 50,
    minOrderValue: 200,
    isActive: true,
    expiryDate: '2026-12-31',
    usageCount: 8,
    maxUses: 50
  },
  {
    id: 'promo_vip20',
    code: 'VIP20',
    type: 'percentage',
    value: 20,
    minOrderValue: 300,
    maxDiscount: 100,
    isActive: true,
    expiryDate: '2026-12-31',
    usageCount: 5,
    maxUses: 20
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    "id": "custom_1784497719673",
    "name": "كون بانا",
    "description": "",
    "price": 110,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1KNlADx9MNqHZPS3qcToIt9f_ctiqk8TyaPyd7JQ3yA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497379865",
    "name": "مارجريتا",
    "description": "",
    "price": 110,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQPhqwG4TCUu_xsSKF0zJ37ewP73Iyz4P1AcU21hILQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497328701",
    "name": "اليكتريك دراجون",
    "description": "",
    "price": 130,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsYF2q_UcU-yW-1zcM6e4OSnraJwuDazFuZokyfw1BTA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497277666",
    "name": "ريد فاشون",
    "description": "",
    "price": 90,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_WFBfdiSNWj654MDqt74j-IWLAHA6EBdM4WW2x5sZOg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497214859",
    "name": "ابل مانجوليتا ",
    "description": "",
    "price": 90,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrzkLqTuyhtdSDN-bftJ3JWyiUNS8C8zFK3RBroSfOA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497185796",
    "name": "عصير بطيخ",
    "description": "",
    "price": 90,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIa1T_aVVEPlC7eiZzYWP5OUID0CnJeCBSCZMNJZj37w&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497151934",
    "name": "عصير خوخ",
    "description": "",
    "price": 95,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLaXjvq65WF8vuoa0oFJJaZ3Ix9YjwivmSBzsSt3Ahtw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497101481",
    "name": "عصير افوكادو مكسرات",
    "description": "",
    "price": 160,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfbFzzW1KIH1k6S2NZ1_ntlPhslr0xLH50nglqE_Osw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497068476",
    "name": "عصير افوكادو",
    "description": "",
    "price": 120,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAayAK1AB7gkSHM3sj_S-8cjLbzu7s3ATOo3lS2gi3Q&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784497035663",
    "name": "عصير كيوي",
    "description": "",
    "price": 105,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtAEE5uWGuqr3fa8cctHscPzpMzxgPOeDlEx989pjN7A&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496986578",
    "name": "عصير انانس",
    "description": "",
    "price": 90,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSCHJ5MWshBxLpog3ZOSYrv_7TCxLrYJbhsXwNTu2ow&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496946918",
    "name": "عصير رومان",
    "description": "",
    "price": 85,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVI97Dsx8ct7AaaFtFN3gY8JHk14wWu8lv3BV8nbLFA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496838152",
    "name": "عصير جوافة",
    "description": "",
    "price": 75,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdr_WOsmjhx8WFDfY7oMRCt8aFB8sY6SWE3hJn51FXbA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496730854",
    "name": "عصير مانجو",
    "description": "",
    "price": 95,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3sGTrnVgHzXe6Sb0Lc2uUVEDsN-i8bt4GsxWLZUDXPQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496519794",
    "name": "عصير فراولة",
    "description": "",
    "price": 85,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyuMFUlgK2k1dZQZF0updOxhNnYs5YoXB7LX_YJx4ADg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496471513",
    "name": "عصير موز باللبن",
    "description": "",
    "price": 95,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaGd1Om3l12Di5DYAKwascgYXkp4eRr81u9NRDMIqoww&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496109519",
    "name": "عصير ليمون",
    "description": "",
    "price": 65,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStyTu-fb0dmys697q_PrH3swrpgapPyvg9HP3wXZX-RA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784496058739",
    "name": "عصير برتقال",
    "description": "",
    "price": 75,
    "category": "مشروبات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwAvc68dVhR3C4JTGaiHHlAolXCJSTxh8rGpjQ7Br0Kg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784495931365",
    "name": "بيف ستروجانوف",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 450,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAvCsQqAYN3xIPzuSBBMcSe5UpRngl6l6tZkBvlknb8g&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونه وايت صوص",
      "مكرونة ريد صوص",
      "ارز ابيض",
      "بطاطس مقلية",
      "بطاطس مهروسة",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495849496",
    "name": "بيكاتا لحم بلدي",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 450,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1idxa6OSriTdve_GtoibgJtvFkF8b8GvS-djWyuSPJw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكروة وايت صوص",
      "مكرونة ريد صوص",
      "ارز ابيض",
      "بطاطس مهروسة",
      "بطاطس مقلية",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495752470",
    "name": "لحم فيلية مشوي",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 360,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0UmcGB-u1k9k5ZZK-VGq4P7snE2Ce8WYBV6Kf5rLTRg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونة وايت صوص",
      "مكرونة ريد صوص",
      "ارز ابيض",
      "بطاطس مقلية",
      "بطاطس مهروسة",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495681243",
    "name": "تشكن كاري",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 250,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyzWrt6gpV07PnMiQkeaHFqZ7Zn4BBGKpjpqfmTcCY1g&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونة وايت صوص",
      "مكرونة ريد صوص",
      "ارز ابيض",
      "بطاطس مقلية",
      "بطاطس مهروسة",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495446869",
    "name": "بيكاتا تشكن",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 310,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXHfQcwaI6J3xQGALxbnnJxaFgoZMS2gw0YKLXwffaWQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونه وايت صوص",
      "مكرونه ريد صوص",
      "ارز ابيض",
      "بطاطس مهروسة",
      "بطاطس مقلية",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495336290",
    "name": "تشكن كريسبي",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 250,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HP3Q_VxuhmZCCte4jhq-6qoTY9x4Bf19JRHuHuwCPA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونة وايت صوص",
      "مكرونة ريد صوص",
      "ارز ابيض",
      "بطاطس مهروسة",
      "بطاطس مقلية",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495175340",
    "name": "كوردن بلو",
    "description": "جميع الاطباق تقدم مع اختيارين جانبين  او اختيارك من المكرونة ",
    "price": 290,
    "category": "أطباق رئيسية",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtgSzlK6jm_hEVpZlMpWVaggGh7FzdkENQdYrOVqaEOA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5,
    "sideDishOptions": [
      "مكرونه وايت صوص",
      "مكرونه ريد صوص",
      "ارز ابيض",
      "بطاطس مقلية",
      "بطاطس مهروسة",
      "خضار سوتية"
    ]
  },
  {
    "id": "custom_1784495143342",
    "name": "بشاميل",
    "description": "",
    "price": 210,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNxFza0MAXDSIesv3kKbsEbhNKE_cBl93Htklfkl5TVg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784495088034",
    "name": "سويت اند ساور",
    "description": "",
    "price": 190,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNhatefGYi9DhiNKbH5FaA5jaslx3jytPUMeWRRVMAg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784495023451",
    "name": "بيستو",
    "description": "",
    "price": 200,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9TzE61F69Mg4-BnBKlVMgzaHlMvscuVj_sr-vcON8w&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494905433",
    "name": "ماك اند تشيز",
    "description": "",
    "price": 215,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfLKfps0YkhQrreWYVfkbq1nTVnu3wiNEOOVJwnmjJjA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494859396",
    "name": "فراخ جريل",
    "description": "",
    "price": 220,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTETOn2bIpLaRnKY-AMXBvVblnNPxNTdUZ189nfKD4ltQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494813741",
    "name": "سباجيتي بولونيز",
    "description": "",
    "price": 200,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSig-dPT1q4rW2MX_z6vtQPxFqFtbhzY4wEe7p0rIpPdQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494772580",
    "name": "الفريدو",
    "description": "",
    "price": 210,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlejqwxc0gXWB4_imw6h9-5_CRRhpLgP9mE0DJMMAxA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494651833",
    "name": "نجرسكو",
    "description": "",
    "price": 200,
    "category": "الباستا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGkQGZJbWgRfo3EFvlrD56ppJUVweDBk8AAmtLhpaKjQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494600007",
    "name": "ميكسكان",
    "description": "",
    "price": 180,
    "category": "مشروبات ساخنة",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJwf7dRP64RQpLYUscsIPnyGqLvQF0RIx0vvWh8LOP8w&s",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494560097",
    "name": "كواترو فورماجي",
    "description": "",
    "price": 210,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsUaZ1ycz6wNXBiNIXQ_xNLFJFtVuZTJAWCj8Vz687xA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494522903",
    "name": "بسطرمة",
    "description": "",
    "price": 200,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBioPGeoaMAa2iRBgAwmXCtHvcZN94lOXLkxEqLObcrZuHJLf8bAaAcMIs&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494473893",
    "name": "باربكيو",
    "description": "",
    "price": 200,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_w-kgMy0IRKD5rENv5cU7lfmiao9aKl34wMiziRJsEg&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494423793",
    "name": "رانش",
    "description": "",
    "price": 210,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpGTjghqf-XkvGH4pdRw9c90Lvkk7kF_WdaIIfcHGQ2A&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494357723",
    "name": "مارجريتا",
    "description": "",
    "price": 160,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhL5lyVd-DxDSx5Nj7E-1POUjRPJerD96DIr-id9sIzw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494325390",
    "name": "خضار",
    "description": "",
    "price": 170,
    "category": "البيتزا",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NkSueoLsWAClV-IGIBTRbMplWl8s66_bFZmOP6qcLw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494282854",
    "name": "تركي مدخن",
    "description": "",
    "price": 135,
    "category": "التوست",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvelEdsRHrtuwTEVGGpdf1vym3gqXPqG414gn1amkH3g&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494236728",
    "name": "بيف",
    "description": "",
    "price": 135,
    "category": "التوست",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuG8ZJg-zn4DHyEPT4c5jtbPax85nFlrk75jnvn_pYpQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494121865",
    "name": "رومي بسطرمة",
    "description": "",
    "price": 140,
    "category": "التوست",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCNAt8j4FA9AdpypFKjDGv2JCQVBlEBzbYaqYW-ci8ew&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784494000815",
    "name": "برجر فراخ",
    "description": "",
    "price": 150,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDnyQ5jDkPOxL12OLJ6ck8s3qFbe5A92jqilY1lHpIA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493952980",
    "name": "هوت دوج",
    "description": "",
    "price": 120,
    "category": "الساندوتشات",
    "image": "data:image/jpeg;base64,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",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493908005",
    "name": "برجر تكساس",
    "description": "",
    "price": 175,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS8vNrcPcM_Nqz7pdKo0IR_u-CWSRS7T2T8Q_9Ml-Aog&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493871339",
    "name": "برجر كلاسيك",
    "description": "",
    "price": 160,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qvgmF_FASAI_72OLLFXuyimC238t2llGtK-9dlCUJQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493822958",
    "name": "فاهيتا فراخ",
    "description": "",
    "price": 135,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUBLSLm94t1s2i4rkpd-kKroNPIwgog0yxM2jpZ7XS_g&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493783010",
    "name": "فاهيتا لحمة",
    "description": "",
    "price": 170,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD_BT7IZ_AK1kZNoGNit4g7ej5CM_NgeIBT40WWzbLAw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493747404",
    "name": "فراخ زينجر",
    "description": "",
    "price": 147,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-nc9r9WWjc4q4XWr-c6odg9obKF1zj0BYthW4zKTiA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493707700",
    "name": "فراخ كريسبي",
    "description": "",
    "price": 147,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkgsCKyEobQ3cI9IYc6zAVwy03nDaRAhdmoxIQ1qbEVA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493668133",
    "name": "كفتة",
    "description": "",
    "price": 145,
    "category": "الساندوتشات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjILqCNqBYbCeTtRwfW15_IVivTdb_w3qxpWb6oBh9BA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493584229",
    "name": "كرواسون روز بيف",
    "description": "",
    "price": 135,
    "category": "الافطار",
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSBTdI4wq53hgp2kRh-gTIQHEdoZV9d-0LiXsNX8lxkWZSIPd0jqGNsq0__JC-JeGIRUwHKeIOc8v4qoo6cmo8zauW-muPc7b5ZRXCpMf3NK2b0&usqp=CAc",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493479102",
    "name": "كرواسون تركي مدخن",
    "description": "",
    "price": 125,
    "category": "الافطار",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAVoBMAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUCAwYBBwj/xAA+EAACAQMDAQYDBgQFBAIDAAABAgMABBEFEiExBhMiQVFhFHGBIzKRobHBQtHh8AcVM1LxNENichaCJCWS/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJxEAAgICAgICAwEAAwEAAAAAAAECEQMhEjEEQRMiFDJRYVJxgUL/2gAMAwEAAhEDEQA/APtlKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBXlYyOkaM8jBVUZLE4AFctrXakopTTh4RjdOw4+grPJljjVyL48csjqJ1TuiLudlVR5k4qDLrOnRtta7jz/wCOSPxFfPLm4luJDLczSSAHnwluf0qMrRlHkJ+0PCjOBXDLz/8Aijtj4P8AWfTk1bT2XIvIAD/ucD9akxzwyqGiljcHoVYGvmVtAY7ZbmULORhvh4MMx+eatrPWI5YiEsdRRBx/0qqPzPIqYec32ik/ES6Z3ea9r5nf9qru2uxFYWOoJtYCR5WVQB6hc813OkaxbanEDGSkmMmNuv09a6cXkQyOvZhkwTgr9FnSvM0roMT2leUoD2leV7QClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAK8Ne1Q9q9XbTrLZbgmeQHGB90fzPlVZyUI2y0YuTpFV2nv5bmVo0DC1h5BXB7x+nT68fLPpXNd26wLNbxFYxLtCyKTkHjIAHH1ot2WkWYSpJMwIWMvkIevQVZ26wXEQuVkkVCdu0Hj0PWvDzTlklbPXxxWONIqtkSSgSz9eWTaVyB+xGPesIkhKNNhU2nCjdkk5q0ltvhJZJN4d3UIFcDhD0wfXPH1qArRGOMNIyEMWYEZ58j+FYNG0ZWbrR4mhWYOY4z94NLgjywQPLrXSwactkgkhcyqAPv4bw+3tXNMsTQM06sYy2dqcDyNRZdav8AS7Q3AuwLRGwsV5FvCgnACspBx6da2xpGWVSfR1esPAliZUZSwwOVBHJx9OtVmnLBch13OZ42G6NWChR5HHn8/nVRKt3qzxd5NFJCPtDaxRFQr+pJJ9c4rddxiRUt4miG0eOJ1z6dDn+8VEnuxGLUaOyTWzp8BF+6ScfZbWG9vnn9aq07YXZvY5HtoxZFWyitl8+XOMY+tc2bOKzijuDZwxIo8ciph856+p+hqRDegQb95Ck7ZO7Xg+5HXmtvysqS2Z/i4/aOkXto0sjJBpzHaOS0o/TFaY+3sDSGOW3u4ZAOVawlbPyK5zVXp2lvcxySR3Gy2kf+HqT/AOQzxXlzoslmxuIZDIoIJZByMeozUvy83dkfj4bouNJ7d2uo3PdmKW3iDY724geMN8sj9a6y2uYLlN9vMkq+qMDXyuc7HaeRmkyxOHA6evFS7O9uNPnjeCVo5ByfDlXXHQ/WtcfnNamimTwk9wZ9Pryufi7UWwskeZD8SQB3UZB3e/U4HzqBL2zkDtGmmsrg4G6T9utdr8nEvZxrx8r9HX0rjW7aSKgzbRBvPcx4+lY//MbrZvNtAq+RJPPr51H5WL+lvxcv8O0r2uVi7Z2/dK81swzj/TkVv1xV/p+o2uowiW0lDr5joR8xWkMsJ/qzKWOcP2RLpXle1oUFKUoBSlKAUpSgFKUoBSlKAUpSgFK8Jqi1TtLDY3IhjhNwB99kPC/gDVZzjBXItGEpOkXjsEUsxAUDJJ8hXznW7uO/vHa4VtjSKFwhYkZxgY8v61nqvaW61CKUq4ghC+GJSctnpn1/KoGnLJqTR26RuZCMsxwMep9q8zyvIWSowPQ8fA8f2ke3Hwvwpa0eEi2kxGqqSAw9cefNRrO6u5i63UKNBgglDzn5fX8K6OHsvCqtHGywtIcyGFTz09SflnriqHWYU0y/RFwsTsLeRMYwx+636fj71zOLq2jeM03SZncXUhs5B8N30qkrknO5fy6ZBrWI5b5oo47ePvw2HK8DcMAk/TnNYEmO4V42kTBG6IHg5GB19+PrW6S7FntnRN7hOQ3SRfLPv/Ks2r0XutnRWGjQW8J3O07OfECfDx086qdSisvjvh4Qsm1QZED5VSScZ9+Ohqjt+0/aPVj3VvJbaZAjEOyRFpMe27j64qxsYooZmWKDcxbdMQctI55yfU1rJJLXZnBSu2SmjW3h6CKP7xZTtrC3CyyZilRm694QOB8xSSRpS6hSFyeN3U/X69Kii9ubS/intlMaR5LIBzIMdCfmPp+RqomjbSOghsLxLad45u+84xGcfMHPBqhuS8wWWd44ZlB7y2kJVuSMcHpxzWUf+KOhJM0d/Fc20gOGG3dt+ZFR7ztVpfaNnt7LebuMHu++iwCPngGrZMdRtIxxzlypmuG5urXUFuLe9hs1kyrL3W4SHHGRnGR68GpSX2patKEiubaa2BHeSW1uw7znpySB9CfpWn4eMJ3N7H3iMRg7eY38sirjQ9Vs47OS3up4ISsmI5GkXbIcZwOeCPQ81nFuWjSaUd0V04milCyjuyAcZ42/MVjGFt8OyqQwKnxYKny8q36xr8dzKljALa5k6s0cuQq9PFgflmomwyxSw3BQbRuU+n5Yo4l4ybMoJWtomuoYWkAUHPB48wPxrOWSOELqXwbzKPF3LADHqCD146Gq66vvgkWGMuADtcckH3/SpRZLS4S2uZd1pcDBU8EcZx8/P6e9QtEvZ1Nu2l65pay6fKio/wB11UZQj+FgR19a5y48DMpiiZwSr5yuGBxxg4xUNtKFteyCCJi7khXilMavGR1bB5Pp58VukgNvDGNxCLgKRJk8dcn+dXbvopCPH2ZaeqwAyJMUBODHwy58vWt0d3Da3bTLKLe5P+nLEDsx8vyq20I2uoWt1b5h73IyI2y6rjwk8ccg1B1W0Sa0MsTCG4ibY4zgdcHy+R96ja2OSbpnWaJ2hF26W92oSVl8MinKufn5H9av6+QSX0shCyh0xjcqEAN7jNdppvahbW1VNSSXCgASgA8f+XP5+dej4/lcvrM4c/i8dwOspUDT9Y0/UVzZ3UchzgrnDA+mDU6u5NPaONprTPaUpUkClKUApSlAKUpQCoep38OnWrXE5O0cBVGSx9BUqRxGjO3RQSa+ea3dXN9MbmWN41A8CBzwPLpwKwz5vjX+m2HF8kv8M9Y169vVZUkEas2xUBwF4yS3GeKpJ5oovsZHaSUjgLxu98dTzXrSm2SSYsy7CftA2SQcZ+WPWvZIUtwzR3QCum5SOXfPy8vrXj5Jyk7ketCEYqkW2laM8gR5AXQeIxh8AH396l319Ydmx8VNHMOv2ahSWBPJA68CuVt1ubcSLZ6jcxb2Bk2PndzyOc4+lT9kDSRrcQGUAY7zO+Q58tzHPNVi0mq7KyjJ/t0X112rtm00X9jHLOJPAgWM8N5FhxgZ656Vybyyx2f/AOweTvHbM1zHuJyT1IPl/LpXaw6DbW8S9/CZCf4d5wpI8v51W9p9M+GSFrRhGJAV2nkBh+f/ABW0ozkvsZY5Y4uonJx2s1jdIEulktpl+0bd4VcgHPtnA/sVYyxfEBZ0i71Xc94pP3ODnj6Z+oqNqKw2+nOZpoY1lyJHwBtb+F8+eMVWWOpJaSxp45En5c52qw8mHtkZ+p9azpo2ey3MlqZJCIDKmMYxjkHHUewB+tTO/MEwFsVE6gbt5xnI4GagS3kNtdSxkYLISyjGN68EA+4H51viufhpo+7JlkCZB3YyMnj+nvVCyJkTxtFJPNky48ZCHn5CtU6QyMsk6KVX/TJ+9W+K1N+2+EMJhw7ISAD6Y9a2y6ZJaiNZ5YjOf4FcnjHnxgfOtr/pS1ZS39lb3QjhMYDOdodEViByeTjjpVjY9mrO2t0mMYjzyjIPEPr/AFqLMmJnCAgoA25WLKT7kGrXsnq0Zt5LDUzbxyxue7keUEzKefunpjp9Kh29IrN0rIWpaPJau13I7GNlwZl+6vpkGqk29jeWNzHPAssssYQxqSEd8+Y6D13dR+Vd9fSIttdQXEuwPGyqXx6eY/D6VwBuI1kjEUhDvwY1G059Kp+r0TF81sr9ImsdKt2ikto4XL+NE559/lXUW+n3Wt2fePbRNtfdDcu4Adc+nqOR9KpU/wAsYb9QVBbcd67L4vmD+XSu10a7TUYlg0y1mgsoVCq8sRjJHooP05q98tsib49FDe206BLZ44+7jHl492DxWEsaB7iTvDkDnxZIPt+VW/ay/trSGLTBGwuJyCFQjKqDyx9vKubbvDOFfaoyQ4U7nyB0HpxVZRotCfJWT9OuPiF+CLDvBHmN1f8Ah8xnyP8AOsO+K7xFtJQ4yOQD7morXcjGG4aYRdwF2Kq9ccDP04Nb72QPEHhRWidQxj5Bz5gev9KJ+i/RjcHUo4Y7iwvhb3SDMci8hvZlPUHGOao57zXdRuFlvO6gGNsiW7HbKTjxY8ugqzvXiVVhIJBUeD+EY96wGnXIaN7dpirA5U+Pjz+Xl51blSorxTdkcGUFj4e+VSAMnB+dT7Gd5Lc/EyL6YMnP4e37VqAdGVftIi5OZJBtDA+xx5ioF2rxfayq8m6TgJznrkVT2WfRZSK8Z3sdnltYjD/XFW9h2uvbWVUMxKDhlfDr8weo/GsdM0y21jTi8jyQyo5QljkN9PX5VR3mnlZJ7WGJ2eFtrqp35BPlwPUcVpHnj2mZvhk00fWdD1iLVoCyjZKhw6HP0Iz1Bq0r5Jod3eadfLKs+Wg8Pw7kq5HGQQR1x+dfWY2DorqcqwyDXqePm+SO+0eb5GL45a6ZlSlK6DAUpSgFK8qJfalaWK5uJgpPRQMk/QVDaW2Sk3pELtPqKWOnlNw764PdxjOPmfwr58t6BMXife2c8HI6/wB/KrntZdDVbyNbRZAyx4QmLcTzyQPfjn2riJbdopS0t7PFtTCqiAqp6+IeWcdMDrXmeTkUp16PS8fHxh/pduzi4W9EZSHAMiqM8Hrj96RsJbhpLQiZGfbymMZ5PJ9P3qDpmoxXmUjfdxgqQQGB68Hzqdo7RW88SXCEvBcA4QAZB4GTx09a5nH0b3Wy80vSV1GR7qYFIUJUGNsbyP761untbW3tLnUJY9kVqDJESeu3nP1xj/ms7bW7cM8IuIxbnc4laUE7RwSfrmqXWu0jdoHXSezI7+36XcyocEY+4CfXzNTGMatejKUptnQL2t0iazjvpL+3igLbR3rbSrYyVOehArj9Q189odVivolni06EPDEGxhzk5kHsRgD61Om7N26AiSFJZJCZJIcHbn3+Vab8LZ20UsNkX2EDu1ODz/WrfJeiY44p2YXWjQXMRkuXPj/0hI4Xd6ED6edUt7apBbR2FxC8NxljAZeCOn5ZH5+9d1BbQ3mnW9yodmESspA+R4HpUPtla6b/AJW2pXw7yS1gc27biNrEcD8fI55rKMnJ0yzns5RbkRwRT47wBN0j+/rW5JUVUZ0a47vGAoyCPIkfOoOmXEAskhlA+HkjEoQdCMkEfT9vwzlLWLud4A2kKG8vIA/QVDSRqmfQtLmE9kkOns6RYxuIxk+f/NQ9b1PStDSS2S6jbVJoyI1YlmJPALY6Dn26V81LakQ/danNaW7fdSN9uefIeVTtJ0YQp34JmkPilfeDJ88t9KvGKS2zBxbei1ktbXCiRHhYAknlA3981oureO7QxSQwyqOREy9B8/LmpcVykZMhCsp65UAnj0rFpYpdshbbJyQyNjFUb3o3rWyvTTizq9rLdAuRKVecsjdFHPkMcdelT55IGkT4hEBX7Nyp6n1zWEFw0s6ZMgZxgFzwvHQe1bmk3yxQyqJJGOUOB16c1EpNhRSKvUoVe1ltbOVu9yGhyM5BxjHGc5H41hbdpe2kBZHe3AUY7x4uR71ss3Qyutym2RQyJggeIHPn9a32urhYd7RSC/DcjaAqrngkc+XOD/WtYSpbRnONsxspJWie4v7l552wZJpXHn5DOMDPkKyhvVkiLyZkc8Ak+fFa7gyyRSSzjuSQSuRsWQnngCo8U2+2jZsxYPiAXbz6+9Q5W7LRVKiZPkmPKju1OWJYscZqTFJ3kEgyrshJVQQCAOp/T86qWlBMgkVvvkEnGc/L51m00gne5hldWZvunG08Ybiqey3ozCK5MryFXGQT9zcc8Zz14/Wt8NxcQPJELqSOJhteY58BPC8VCuwkTH7Nfi5HH2uTtyeOnSptvZXM0LSSwd6FHAjPfd62DxjIA6fKpsgzuQkduc3Uczq2AFcM2OnStwitZLy1CxqZ15Ve8OWcfL3qn0+zvNUu+5tNOW2mZvtmaPbsI46eRrvND7LyafcPKrxSSsctKVGc1eONvorKaXZaWekbLARCQxuzd5kjkN5/Ora1tY4IyURdznc7YwWPTJrVE1xDuE32qlgF24P41uXvIQ29i4JOOOR7V1Rio9HDktmnVdMtNTh23UWcYw68Oo88H8avY9uxe7xswNuPSqJ7sb9jZBPpU6wuDvSEEsuOM/wgVvgyQbaXZhNOiypSldZkK8ZgoJYgAdSa9rku1WrEXK2MR+zT/WPqSOAPl+4rPLkWOPJl8cHOXFEjWO08cStFpeJ5843bSVHqR61xjahavKkt1KgQy/abHOXJOOT86xuUG4tIO74wFUkswz7+X8q8WQxCMd3liwaPwlQox5eufX0rycueWR7PVx4I41o6W+1DTbKymhvLmO1hCgyKh8ZDZA6c84NcY2qPqc7w2ulJaadGNsBeMh5T/vPmOMVa3MUcswdlzMAfuN5emP3rFVZYjKqhuCOVxj25ql2tlow47KCe2nsJ4pjseZm2jYRwMfzFTJGjkliuRujMqd24x/F/Zz9KidoZJI0jkRXW5lKoWz4QD5j3rfZ3LzaOsnh8LqxLdSfX8qEsqrrQYJ9pIVQzgPlscV1vZufTtFVoWuYbVQnhk3AA+RqvkkPxDTCLMTyDaCwAQYBOfqTXotpTPIsYh7s9VZhkj2PnVXIcbVFnrPam0uop7Hs681xeltsktvjYBxklsHyOOPOoV3qMEts0VwklvlCGDLtYeXWsi8VvGvw6xq6E5KAMKjqsNxNHeXESTBc7sglc/L2qza9ERjxRFtNe1LQLEW80ZuLGYkq4XMkZ81OPfPy6VU6v2gm1TTn08W86KHDPI4IIA5Xr15x/SugnhgZZbq4m8B5Rdo2r7nFVOqrJLp567WYBCuCAACeT5fKrXHutleL6KfQgYoYDdOrlQTuHQg5yPzq6WXfMsr42hcMTyGYVTWNu9uyQTK3jHfRurD7hzx+P610uhwQ3Uiqw393mQ+hOMfrk1TL22Xi6RHkjgtbn4ma3DQk5TIAC59ecc/v+G5bvMUt6wGBxJDH1A9cEc9COlW+nWsTzXtrfEvbTkhwzZOAMfqPyrjYFkj1CYkpL3DFCUXjA4PA+VVjY5Jlj3iOvevhoyMgLjw88fWo6bbmXcSWYDjyGB7fOsLOKS51iOygj8ZfiN8BS3JyR6AZ+lXWq6HaQfEzQzAbEBdIotqHHXHPSj0heyuK9/Mv3huG3GMDOPaosc7rK0T5Qr4UGOQwzUi1ZJWDRJFKVXI68+vua9nlsZriSTuUaZcjYy5CsDj68VVovZY6dYW17OrT3XdyyKShVCckHGTnHoc/1rTHoM2n9oe9nUXBTMygEqDjAXBIwSM5+laNB7TQwubHX2RIhtSDZDjYuOP25966a/utmli/trhLm0AMm0jDAfOrVKDMnK2Vsi/F6XfsZJVBDFe9UkAryPz865VL3H2rHZMvRduAGH9ipmu9o7O4gNjZjwyMonMX8I88e56fSqW6lhjmKW5lmXYMd+24j5YxV1CkRFltJNH3cUkrGNnGc4yPn/fpWTSWxHeqZWlwdpCZXH61AtoZLlGHewrt85HAAz7VPWK1l8aTzpIfCN3OeMZ4rOTSNFsuez1hHql5DDdxl0QMFcDnGOCfpxX0ew0+2tY0SGP7g2gkeVcx2D02S2gMkzl5GGAcY4rtUFThqf2OfPLdGHw8QkMojXvD1bHJrXcg7Nisct129alAViyjqAM4rti9Ucylsrpe9t9ql2ZG5561N2sZCWGYyOPYj/msFQeFzI/i6KSBWwM33X2gk8DPlWqRaTsgRRxt3sjvtTcTzjj1/SoHZXtHDqPaG5tYCWgVGjQnGdyN4j8j+wrf2l0+4vdKuYoZGV+HTaOuOdv1riP8AD22lh7XRNEuUcuxOMeErz+dVxrjNUiHFOLZ9lpSlegcZhK4jjZz0UEmvlmryySXnesCzM+WAH3j1r6H2jn+H0a6fcqnbjLHA5NfNppu+WRnZmYL1Q+EH9cfzri8uXSO3xF2zbZmW4tmYyBJ4PCp38ZPtWPc+D/qjM0S8Y5A88fnUKGU5Z+7U5UFWweDnr863OptGPdSsQZAQVjPOflXm9M9BdEuFTFJGyIrbv9p8R59PSuittNtY13tieZsnAPGfpXHd88gcW7CMFeN5G4Golr2x7SR3EVpDpsCdyMSSOuBK3r7e/X6VpGLfRlksue2FkkMG2SdElkVpFRMARhf+evrXNaey/BTwxlmwjgA+mOp9/OpuoX11qLuLuSN70kBl2YRAOcKM8e5JqHZlILyYnO52I4OV2lRj86rLS0WinWySSLiwcfaM8cgdASBuBPBx+P4VuhnEUPjwVuCQFYDw7eB9c5/GtUCpG1yioyvt2iTPDAef4mosc1j/AJhG1u+6d+I9wwN2T1B96zouiUsi2EgaZRLxyGOBivbdmluPsUwoJO0N6+la5p0CvHKT1+0GP0/GtVuJ7k7EeNol58LYVh5D58+lWQJqLqGoD4WGBGLkAohwR88ennU3UtC0zStKaa7e9mnPgjUeDc/t/M5qFbXraLdi6lkOcFAkXIBOMZJqRqN3I0Mmr6zc4giUCKKN1bDHoPmeKmt0ZSk//DkordbTUR8RM/eqNiruyuxgGHPkQeMVeaJPJa3yo7bVkRuSMAFjxzXGmd5Na+OkLkyk8E9OmAfwq8tpbi5hdmO0/dwc8AdMfWr5I9CL0dJb3y2ltdXsyB8Mx5Hp15rlrCWS5iuHuZWBdi21RnBOTikl9d3Nh8M7juhyw24zn39aytNkcEjFxzwOcc4/nVekEi57FziK6uJMOskEG1QcdS3J+fGPqav9YvYdN0iczMjXcy4CnguzdRkc8D9K4GHVZ7O4NzAPEy8q3AY/3+9brjUptXuHutQwFA4A421HH2H2a445gzT92QsJBDKeR8uakPJEZUk3CMty5znnzrBGiIDGRhvY7dy5xWy4mQrGI0jCRgr0xuyTn9aMsjRcW8E7pM23IOW3HJH9it0NvJ8NdWjEBJkII5wDUvTbVp5e4uEDxwQ96EQkGUlsDkeQAP41PuLKJIhPZoyqOJIi2dvlxnn9aNuqI1ZwyWqWow+OvJ6Z+VShAobwpIxbkEYIxXW6b2Pj1CZ7pnOxm6entXYab2TsrfH2e4+pqssrfRRtRPn+m2V1JuSztnAbHifrXY6H2UbajXfO3kLjj++K6+106GEYVAPkKnpGFHAxVVhc3cuiks1dGiys0togirjFb8YNZ1gzAGuuMVFUjmbbZ7SotzfQW65kcDj1qqn1S6uDttICFPG9/wCVQ8qWltl445SLs7C5xycc1gdgOcYPrjoKqbVWgbfdTfaMdvi4B88CvLnUFtp2+IkdVY5TaoIxW0Jvj9kTw3SJzd44YxTAq38J6isezGkQ2l3e3uMzSvtGR91cAn8T+gqJFewXILQSZI6joan6Jdr8dJATyyA/UZ/rWmNx+RFcqlwZfVS612hh09u4gTv7k9VHRP8A2P7Vt7RakdNsS0X/AFEmViGM4Pr9P5V88HfFptjO8zN4pZW6eZx+lX8nyPj+seyvj4Of2fR7qmqX+uyOElDKuVDgYRT6Anj64qhsEFk08LsGMmPvZO44Pr8vyq3eURXDiWGRI2IHfbuOOmPqfzqovIpkNtNO7TPu27sAbAflXnKTm22ehxUVSJMe89/3JwI5Cyg9SCAePTp+dexM0AQKYyGI7tQcSHnoB0z7fXFakk//ADE2YUTDlifX/ivIJd0budsSbDnIDMzL04+lVfdkoySRrqe4IjEZB2lJTnJHnnGPLFblc7XjiUbQBtaY568Y68j/AIqu+KDxxu8/dn+P7McD0rTdGNik3e7FUnYsiYA565FLZNEvxaiSjxhDGpBwvdg+uD9PzqLAyxXM8ZKlQRlNhBXC4ANRr2ZpoMRTySRR8llHGfL3rVZPGW3EKAWU4DliVGBzz19qPoj2dCziSRS2PEp5Uew4/Gq9+5Vy5jxIjYDKANv9/vUkXEYhHgUtg7IwOvJ/pUe4uUt+/dYwWCnwMBj5j8apskQQyd+PipvAufDktn/+eg6VqkMcJkNs8kikjlD4fVV9fxqPPePM6IrNFMh8bA7VbA9PxrXHFCpDbjHISMg4OSSecDy4FWSFmi6k3mWMWb43ZbeWbjyGa2wRyi3Zbre9uAFVJZ/ujqMKTx16gVgRPdeARKke7Od3v1OayliT4j7VwSibQQxz1/lV+TKUVmrFY5YHKglAoCIMDGMfz5q5sd80QMh6+IEcE4yAPlXN6nululIBALcAjkACry0lc29uwzzG3I8+vWrTX1TKp7ZvVx3aFACdp4I+9israRYImcMCzNjZ55x6VogdkiTJCSMenp1qy07StS1C3eRBHDBJnBnYjdjOMKBkjnr04rKi9lJeJLDP3c4DyKOMdce9brUqqu0igjgEE4Y81Yalo96io95d2L3CrtKRyNk/UqAaq28cRCNgnjIHSrsqtk6/Iit0gijh2y+PcpyR7A1HZsrGroT949MkAf3is4o2S33uQRjd97GB0rDvkGCM5GR61BJI0K4W2u3vriaQRoWjO0eR54HqCBVobx+7kmsnEkTRkv6k5GTXOS3AhAZo96uclWPB4qw0Nbt9sKIymXg7xxt6Un1ZCR9J7IRr8G0nlLIXAHlXURFQKodKjhsreOHcE2qOKmreNK+y2TeehOeB9a58c1HXsymnJ2W28D2FaZrqONSZHAA965rXLjUIbtIlmZY5FyDGAOc88/hUWO3un8TP30Y6ln8Q/GtnkyN0okLCqtsu7vtBHEq93DI7NwAo6VEku7y5bbv7sZGcfzrStvsTlgB6rya3xLFCuQc7uRkHitI4m192PqukSUtraAl33s+OQQWJ+lbQYRgbAEC4VsYJFUGq6pcWsqGOUc53D2zxU201UzRI7gMx545Ke9brjHpDi+yU0soZlC+E8Dc3B9vaqXX5iVhY8MCR1z+dT7mVwd1rIGViAyuORWCae16VUQNI4OdoqFbeiU1F2yp0lpBd5TO3b4s/361f6Sr/AOcKyggnZzj3Ofyqws+zr5DTOsQ/2oMk/wB/Wrq0sLa1OYky/wDvbk1vj8eV2zLL5EXpHF9srw3GoSW4Ld3Euw7fM9f+flXIST7GULt7tcgDnavPzroO2FvNaapNHKWMMuJVY/xZJJHHp0rlZLqe2CTRrAFDZGUGSfLGP1riz38kmzqwV8aom2UkvLNHEAcDg55xz+34Vr1dybKURkY2kqwJG3PnUUXckbI8kZ2hv9RW2ZX09/zqVdLGLdrixVmidcurSqQGHTPt/fnVFLZpJaICfb2NvOuNyHBGOT9K3SuJYiyR5TdwQQG9P61VaZ3xgdblSjMrMp6bsHPH51YToJo44JHkijHUxkgnzB+tGUTNki9zAXa0h3pu+0dAqkHGOvU81WOWMbTCeCRBksg4IPyPWtt63x5UzGQKGAJ9AT6GozM9o7LCiXCDw8gHGP8AmhazG+uFCthUcMPIdOK0WU+GiXaSoLHjjgkfyqVdpiKF7mCPnOwAYx5dBUCFZFYLIPAGJHGDjipVVRXdnQPcqZBtGWKeHaOM5Oc/jUe5yJSWOC2SQefPjH4VrkmXG9lwhTO/pjnHT3r24kDou9xsVfC3mCPeq9EkKRizbh1HJyK2RgY5Uf8At06+te3EJjO6352gZBIyM8/vWhS/QjnzHnQk3+CNMq292JZmU8A+X1rU7hWxu8QHHrmsypwCFwxXOcjpWtoZJtuNrN5ClogqdRiuJYAUkAJY5wefmas7OUxWkTeTnauPP1z9cmtw7L6le5yvdqa2S6RdaYmySPI3AjjPvWspxcUjNdmmEGVgMYkDEEenHFdJBOt0gL33cqoAcqvlXLW3f2xaRgC27737VlPeywSbYgAxGWCjIb+dZ1b0XfRdahcafFEVs9905PE8mQE+QNUzt3YLA4Hr+pqv+OXJCrKSfJFzzXkdtrF3KsttbEIMHxDII+QraOKTKckkW1nb3upKGtRGEHWe5bu4x+NQLu5KSCBLy2uHycm2JKr5dcVMtezeparh7q4eYDqoJIX/AOo6V1Wn6BZaaFikt3d8eIhcAVfhFFeUmclbWVxMVIikk8+mBmuz7PafdsgVDDF9d36V1GnaZavErwxjaT6VsmtbzYfhwiRK+F7tufriqSxphSNttpKuB8VLJL7fdFXcYWNUG3A9hWmxtpolXvn3ZHIJzipbssSFjnA8hzWuLDGC0qMZzt0Vut26CyMsS4aEbhj0rm5bqXuj3WAx6V1d8iXllJCVwsiEbWFcTdaTq0ZT4a6tpA3XcrDbisszUXZaEqVM1tfXNrKN0jSB0/iPn7YrZYy3Ycz3UxSI9d+PF8qqr/8AzCArG9wJH8jDghfrURfinIF3dPMP9pckioUnRLmjont4L8fEPKUQHG4t94VtW40+GTu4p4w5AUKZACR7Vzo00ModM8+R6Ct0mniVYYoIy07Sd3GV/iJ/4rP5m/RX5TornBiURMN78gHgkDr+1XfZS4eG5MM0bDvQAp9CMmtln2IsESBrua6nkRRvBlwrN59BnGfLNdFbWVta/wDTwRx8Yyq+Vd+Hx8ikpPRz5MqkqJFKUruMCk7T6CNcgjVZhDLFkq5XOc+VfNNT7NX9ldSxN3bRxry7MpHrx519lJxXJ6/b/wCaTE26gxFQGLHG73HtXD5kI8eS7OnBmlHXo+cx2MbWzGRi3OGVV3Z9v+KzFnHAFcwiNHIyjHI4HpXT3Ol29koCLh1zyzda5u/kmkvYgMiND0UZAPrXlqLumbyzSfspb+8MG5o1YYGFyARj0wfKtdhqhmZIzb4WIBi+7rz0HGfT8Kk9obdiyspz5YxWWh6XK9ruZPFI/wB5vTp/OtbXsyWSS6ZEub1GkXicqCSRwB9KjR3ktxcv3dvGq8k+ZPzx9K6W/wBFhiie4lO2JB1xjNSOyfZdpHubm7ClZEXu1XyUkn+VVTTtGscs32Q9C0WW/uhHcYRChKhVA3exrpG7FWrR7cHd/uq4g05LR45VHKHNXzKDVYxTstLI7Pml12SuEJ27SMYAI6VXXGg3aKuYVJU5yOtfWjGD5Vre2R+qiqvG/TLLM0fHF0O7V3dYW3Ou3OOlSxo2pXGVWJwh8i3FfVhZx/7R+FbVtkHQVHGf9J+U+c2HY+aZt126qP8Aaq811Gn9nLW0UbYgT6mugEQXoKzC1Cxv2VlkbK34FB/D+Vap9PjcYZAfmKuMA1iyj2qzxFFM5S47OWshJMC/QVqh7L2kaMYoVDFeOPOuommgiUtI4C+p6VXf5mLkEWC94OeccVCjTL22c7pvZy0SMO8Cg+rgVMtLCxa6KwrGWxjkkcexqzW5Q20yM2ZUXLELjzI/nVfYkvPm1dAy56nyruXSC9ljLZLaWh+EiEbHHQY/GtVlZzXDhWw+Dkk8gf36VPtp5BCUuXDMh8vMelaY9XWWURokuxc7mVODj3qWo2QnJJosooY4Y9qrwvoOtb1AUjHFVsWoREbk3+IhQpxUk3Me3LMD862Uo+jKUX7Nzs/e4V12Y+uf5VjMQ6Bg2R7HiovxCNIzDAQ4BcjH5+fWtQlMQljAUJ1Ry27Ofao5Dib3/wCmMmSSM7efpXN6pdLJdxRbvuqd6IeOen71dm8QBUx4QPCG4yflXzKHW2g7V6jZXboYXunCyJnwc8A+w6Vz5o81piUWdULNCXiSNgr5JPXHrVPqVuYmwCFyMgn2rqRtgt17znd0cc1VadGNc7RQafEu63QGW4k/2qONvzJIrPE+T4IonWx2b0a7udMN1b2u+32ZjZuC/wD6g9R/Yqbp+nMmoW8YDrMHGzcpXHnmvoiqFUKoAUDAA8qFVJBIBI6HHSu38CFppmLyNnte15Xtd5mKUpQGi8bZaynODsOPnXMXDLESGbAPnXVyRpKhSRdynqDVR2m06O40S4SKMBkHeDaMHjr+Wa5vIwvIr/hpjkk9nBa9q9nDAWS5iZefEsgYk+gx1r54mrSxagb22xvJIMch4I962ahb4dLccOowMnmQZI/lWiWygaZZCCiZxsJ54HHPvxXnxiond8aOtghXULaK+Ru8aUEhFUgL5Z5AJrrNO05IIowq5woAzVT2Ugb4GBvFyMAMc8Z4/Kuj1FWSxlWMZd12Lzjk/pXNKV8pHM1ujn9XE2o3sFrajMaP4x5HFXaXNvpKju42cyALtTrx5VYafpcVpbxKiqpUY8PSoetWrPPAUjLFecKM81tiwuMN9s3jX6mi+1e9SMN8FtRzgFzz+FXek3LXNhG8gxIPCw9x5/hitV1ai8tIxKNrDBzjzx51p0sfC3b2xcv3i7h1xkf0qzx8GS6cdFt9a9BrE1jJIkalnYKB5k4rO2UNh5GAcfKvchR1qkutaAXNrhgf4j0qCt1eXfjEzNEw4A/pVeV9Ky6xut6OlkuYUGWkUfM1X3Wu2kLBAxdj0CjP9Kr0igjUmSRHIbBBboa53tJdrp+og7N6sg8MJB284/WrfHP+0TGMTpZtalYfYooPluP7Cqx9YvZZTAGkWRiAAi5AHr7fWqKLXU28W1xnHqP515/8gmjjxHbylx/FIFJP4YosP9Zokl6Oi/y2WSTvJ5mbd1Eh3bfkD/OrKEpFbKIGiwB/s2n8K+eTdrL9SVaOQt5YYAfpW217V3Mue9tchfWbaD+VapKPQcWzq7mB5VnkMzrv5Kj++ladHUws9wehXhh0PrVQ3ah0gDPZomRgBpgc/lzWMfaKa4hATTQIcdFcgfoKhzUeyG/Rd2+o2scsrrIe8mIJQKTz5VJVZwyyKSzFycszeEH0Ga56DUr6JR3FhGqj/cxOK3rq16y8iOJvIMpIH51T5olbR0YLnxKxH1rzc+xi2VwfP0rnYnvmbe10288+Gt0uqXmRFG2WU/fIBLfSrRmpdBsuppPs/FKvdkcgnqKwgl78usZ24xzjqKppJZ52EkqAy9MZAzXPT67qOnXBt1mUzhfFL3YAzjOB1Fa6FpndNgzHvMZjGdx/hHnXy69ljuLuaZEXbNKznA5yxz+9d1pHY/tRr8YuNd1RrG0mGfh4sbmU+RA4H1z8q7jQOyGjaCA9na75/OeY73+h6D6YraHjyl2YyzxXR8x7O9nu1OplBameytB/3LsFQB/4qfvfp719T7M9nbXs/aNFAzyzSndNPJ96Rv2HtVzSurHhjDa7OaeRyFe0pWxmKUpQClKUArwjNe0oD5N/iV2Tktpl1bT4gbdWywX/ALRPXj/bXEyRNKqzTbThsnPl/fP4V+jXRXUqygqRggjg1wXaH/DuKdJpNFn+HL+I2rgd2T7HqPz+lcebA3uJ14c6SqRr7NWhi0q03LtfulLD3xWF5rVk95FCLyJmS4Ve7RxktkDGPrVX2q1a50Sxg0i1Ez3fdKskmw5Axjj3OD8q5fs7YarJrFjKdMuxbJPG0kptnCgZHO7GOK4FhfRaKT+zPsveKFKjnaAePStFrcRzySHaEYefrxSO6ik3qpJK8NmosxWUyBN0Tg4zj7wx5fjXTyLKP9JUayRvtlk3BiWBAx9Kj3rGO4iljZdoOcYOf7xWCXCW9vgyPgZPjPIHyqou5LfUC0UFwGJXI2Z/CqvqiyVuy2utaj6W43t7+XzqsvGuJ43mmc7UUttHSollshlENvD4M9WbBb1I8v0q4lIELZTeMYK+tU+JN2yf10iit3ljAeV9/e8BWXAU/P0qb8QLaKSOFGa4kOY1C5xx5D04JqfFMs8MZkg7sgfcbyrER26y99tw+NoIPT6VKSRNp9nOQrcSzBQDvLeInj8a87TFJZY5SekYUt97OP6104Mfes/hJIH8Iz881TavGvxCd46LAifdP8RJ8zUXsvy5FfZWW5IzKoO4Z6AYq1/yqFl+5yemDWDPGJIYAjBnHhwvHFSppZ5RFsHhDAOfbnOPyqStsjx9n7IqDJErSN/EDuqPd6FbvcIkY7woAQuOF56n6VdhtoVQ2BjoOtZLtBJwAT+lHoqpM5TVYLNNdhgfjZHnpwcn+ldRBZ2ARMxjBAK4HUfvXIusepa9OhEmyHbuxwDnkAfjXV2st5bwxJboq26ceM5bH7VzT72VnZIawtCud55/hHUVpk023OW24wP4qrdf1a+stNuHWa3hmbBiMgzu5GRjz48x0rnJO0urXEMcS9xG+RvkRMj3wG6fXNVioshQk+i6166s9CszO8u6Zwe6iUeKQ/y96+daZqeuRx4iZO5U5ZZEzknr55/CrS7zdXTS3E8lxIeru2FHoBjjFa5pSuxowmAMAAYx9K3h9VSRooV2W+kX8N/J3d/Gtt4M94swC5B/8sfvUDtc1pIIY7AtK0ali46N7D86gJ3ksqQQIS7nCqoJOfQV9X7Gdh4LOGO91mMTXhAZYpOVi9Mjzb9K3xY3N6M8klBWdfpUsk+mWk00RikkhRnjPVCVGRUqle16ZwClKUApSlAKUpQClKUApSlAKUpQHhAJzjmsLhO8gkTGdykflWyvKA4qd2WLdhmxgtt4JrwSFyNmSCMhuorp5NItpHZiXG45IBGP0qMvZvTw27E2c54kI/SuH8aVnWs8a2cnqNlJO6zxs4aNSPs2wSfSlusawqWDR5HQoN2fMnHnXbLpNkP+yT/7Ox/ety2Nov3baEf/AEFWXjP+j8lfw+cNazmYtaSeEZOCACM9atIFaO2QTMTtHidug+ea7lUVRhVC/IYrKr/j/wClX5Dfo+ZXuo6dIojj1e2V89FmXn261KsxFBCD3ocN4twUDdVl2r7AafrStPYpHZX2Pvongk/9gPP3/WuOi7I9srR+4WEvAFI3Q3CY+m4j9BWE8U4vqzSOWLXdHRi7tdwUSJkHk94v4Go17cO8my0SAvkHJlByPlVF/wDAe0N0x76wgTGPHJMgY/PbmpNp/hdrA3bruytt2OVLORj6D9aqsc3/APJd5IL2dAF54I5HQGs8beGNVFz/AIXzW+kXbxazcS36xs8QQd2jMBwDyT+dfLLaW+AJk1K5C56G4bI/OplBw/YrGSm9M+shZJdSDLLNGFH+kyYGPn51IeeNZu43+Mrk+w96+V2t5rCyArfXc4z4Y45XLH8+lXUt12ju3e1stO1GbvF2svcuV5HqR+9Zvekaa9kL/MLuPWZbuyI3mUkk/c29MH2xiulue1N4YhDbwQxGQf6hyceuB0qd2T/w7vGjN52nRtqoSmnJJneccbiOB8gevX0rnLPQde1ZxDaadKqxjYDIuxU9ck1DwzSVoj5IN/8ARFmuJTJ3soZ85YtjA/4+VaHd5mXARFLenFd9Y/4b6hJte+1GCD/xgjLEfUkVfab/AIeaJaOJLkTXrjkd+/h/AYz9c1pHxsjKy8iC6PlMdjdXsiRWUc1y5+7HChP9APeup0r/AA31W7KPqEkdnET4kJ3yY+nH519Vt7W3tV220EUS+kaBR+Vbq6IeLFftswl5Mn1op9F7MaTouGsrVe+AwZn8T/j5fTFXNKV0pJaRg232KUpUkClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUAryvaUApSlAeGuT1H/DzQL+7e5aKaJnbcyROAufPgg4z7V1tKrKKl2iVJrorNG0HTNEiKabaJDu+8/JZvmx5NWWK9pUpJaRDd9nlMV7SpApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUB//2Q==",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493389408",
    "name": "كرواسون ميكس جبن",
    "description": "",
    "price": 90,
    "category": "الافطار",
    "image": "data:image/jpeg;base64,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",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493305690",
    "name": "كرواسون كلاسيك",
    "description": "",
    "price": 120,
    "category": "الافطار",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6waMocD_dTZgWGdMK-1VHqsGO_7kGqMHSeVNnKmyKvSo892m6mfFilQC_&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493242397",
    "name": "فطار مصر ي",
    "description": "عسل اسود - طبق جبنة بالطماطم - فطير - طبق بطيخ صغير",
    "price": 135,
    "category": "الافطار",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG0YsRUcGBb3xh51eRM4akGocEz2hd99eawqFT1ARew&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784493056844",
    "name": "فطار شرقي",
    "description": "طبق فول - ٣ قطع فلافل - ٢ بيض مدحرج - طبق جبنة بطماطم - سلطة خضرا - عيش",
    "price": 115,
    "category": "الافطار",
    "image": "data:image/jpeg;base64,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",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492988075",
    "name": "سلطة بلدي",
    "description": "",
    "price": 44,
    "category": "السلطات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQPmWiyuHRrG5WdY5z9bitkU1EF8j2cDTsCTks3i1NWA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492942096",
    "name": "سلطة طحينة",
    "description": "",
    "price": 49,
    "category": "السلطات",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIASgCBgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xAA/EAACAQMDAgUCAwYEBQQDAQABAgMABBEFEiExQQYTIlFhFHEjMoEVQlKRocEHM7HRJENi4fBTcpLxFjSCJf/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACgRAAICAgICAwEAAgIDAAAAAAABAhEDIRIxE0EEIlFhMnFCkRQjof/aAAwDAQACEQMRAD8A84lW6bPWhRbSb9z5qyN5ap2+aHVFlbsB70mkV2yGx0/zftTSPw7IfVt4+Kb+ELEXN+gOCo65r0q50y3jtfyrnFLJ7GSPH7WL6KcpIvI6VYdIED3ing45JPaoNc0zdcsYyFG7tUdm409g7+paRpPaHTa0z021voUttvHSqX4q1OEzH1AgUt1PxUPJ2QElzxgVUb5r65ZidxBOc0iUnpj2lsfLcRz9MbvejY7qMx+QqDI70g0e1lx6s/7U+ht4ULMW/KOuaZ60L3sBnVbVi+Rzyc9qyK4MiZXAqDUkeW42dR3NaRfKizTxVq2Tk0nSNCN3my0vGelN9G1EabcEkAj3pMk21slwPjFdlkk7D5otejdbLXqXiyFkwr4OO1U+/wBcM0mA3GetQzWRlO/t2qK30sFizYzSLHTsd5bVJDC1k88e2e9N7WDYmQAaW2Vv5TZPPtRcl2Vk8tTjPtVE6JNWN9HskvL3EmNidj71bruC1t7UqNucdBVBs7+S0dpVyFo79vpOrNJLhgOmanOysIoS+IbCGW6LsNvtUUYjihWOL25xQ+oNcahMTCSPastrWW3GZ29VGOgSJ2tWA3nNSJB5kJ24+5rS3Jb0hc0VG6CHHBLHiiwANtZTTXQiiUlia9Z8OaU1vaqX/PjmlvgzRgsYnlTJbmrsqKi+kAVOTbBaQOYcDFQzW+5CKNNckVN40wqQjexI5FTQKyLijZsAc0I86oahwimX5ykqCEY96kZuKDW5UmpvOVlp+X9EcX7Rp2xzS6+vDHnBo9iGBxVb8QS+Su6pZeVWi2HjdM5n1l1UgA0pu9XlfIBNCPqUYznvW7e5gkbnFcNyktnoQjGPojN7M45BoLUL0wQ7ixyab3LQrESnU1TvEsrx2784z0quHHye0DLlSjoeeBLH9sagby49So2FBr1yMJEgVBgY6VQ/8L7Q22jxs3VuSferueDXTklTpHAo2rZMG5qUPioEbFcNKAeaylSA42El+axn4oGW8VTioxdBuRW8gVifYcGzWFuaGjm3VOOaClYJRo23IqCXOw460SFrmQAYzTVoCYkngklbnOKBuIJPmn8rIvXFA3E0Z9q53E6ozkLbaCQODTm2Bx6utDRyIRxRCSgAYrRNO2THiomOeK1JJkUPuOeKdyJKB3IlRCME81Jv45qN5cVjGyoUcVE70Pc3G0UpuNTEZJockmNwbHDS44oaaVdwpDJrSnvitR6l5vQ1TloTxOyw2snr4o1hkE0itZc7TTtDmLNZO0K1Qp1E7QarlxNumxTnVm9Rquy8yZ9qSrZVdHUkrK1ZQkz5asroUdEW1YpRllf3GKISHaw69OgFZZ2R9PXPeipjtXZ0J9q9Ds4+gnSdWTT5Mjgmm1z4veUbSwA6darEdsrOODyepri506RyNuR2pJJN9jxdeh7eaxCIt6sN3zS+a485Q59RP9KQy6bcCUbncgdAaZRRzAKuD960YtGlIOgs4kQSvjI5qZp02ZK8fbrQbrKu0E4Uf1rQkywGDgf1rSTemBNLoI+o2KdowT2rSxmX1hmAPsajvMOm2Mje3U+wrnT42LrkttHsaChZpTDntsDcWO77URpFpDd3LRuRkD0qa1fAJDwxz1+9C2AaLDqdrkEk0/SF7JNe0qG2ul8gjaw6exoBbMgccgck0RdXEszh5ck9BXaGTycKvStTCq6IgnoA7mtquOBUyrsT18tUkKkKr96NgNFQqY9qHWLDg7RknJosEOMn8oqC9lEETOcZIoaZuhZruoLbwEL+gFJfD8dzdStJIzbT2oW+lbUr0RL0FWayt/orZUX8zDFMzB9qnlv+GMiodRmZztBxjqKJsw8KFm5rSxfVliQKm2l2OrYNbThI+cfeitNhF1dCQtwrdqBeBjI0ag5WuYGmtCQGwT7Ur30FWeyaBe2/lLErDKinbSbua8V0O/uba+EzOSGbkGvToNQMtupHcVPLLgjRxtscefzitiTecUtt8yHJpkqbQDUoTch5wUSG5GQaVzx5NNLgE5xQfknqaWfY0HQCIipyKIjJPBrp1OMCu7WBiwNCMGxpzVHSoWGAKB1PSRdxlXNPhGEGe9C3L9RVJ1FbJQdsoV54YWIEoc/FcaX4edpMuuMGrNfS7ee1dWV/ABtyAajjjFs6J5JxWmKrzSYrWEsxrz7xTaXE8gW3jZwCMYr1LVES6AG/ilN7JY6fASwUkdas0o9Ikm5dhvgxGg0qJHXawUZFWItmq74Y1KPUIsxDCcirKE4rladl7VEEj7VNK7zUBChJOKZXY2xkmqXrU+5iCeAanJF8UE9nVxqjPJ+am2nTNMBg5qo20ZmfIPer5oVqEgUsOcVuNsfJJRQyto9ijNTI3qxUcpAziubUbpKsls4pSsNbgULK2KIl9IAoC5bIIHWtN7NiVi6+nPOKUyyMWpq8BJJel1zCyk4qDR2QoltZSOtEfUqpwTSz1gcUqvbqWOT4oWM4WWtJwxyDmpfM4qtWN+PLBLYNSzaqF4DU1knB+h5JLih3kyM0jj1EyyACmJk/C4ocjOHEFuJMlhVf1FH5YZxTmT1PU/7PFxD96KVmUlHTPPbl5A+OaaaTuLA1PrWkC3O4Cp9Ct95HxTyeh9DuzyGFNLidkiGOgFBMBAKgnvFaNgaWL0Rcd2Lb663y4oC4fitXTfi76gaXc1XxwbROckjjbnmsqXeorKtREj80xsSFyDQ08u9t3TPtzR/4AiTIBOPeiLLTROpc4Cjpt711r+EH/QbT1E0qIgO48ZPavQNM0O1jgV5QCcclqqun2aWkm/G51OeaLvfEcsUexTt21ObplIKxpqelWbZK4BHxVVv0ihdo48fFCXniSZs5lNKrTUfqbsAklietHHJvQJxS2Ol0+R4zI5AFC3EexcBfV2pvdNLFY5zgY4460Fp9ubvPHNUT2ScQG2t2Z1DH0nrR0SIkgGMZFNxpmxDhelLTYztcbVDYrOzKgeVVHU9+5rVsASN/c0Y9hskAfBOK0bF5GCxjA96VSrsZxT6Iru23FXQgL2+BUyFERQBx3NMf2aRAqn25oT6IySBI1JxWtm0RS25kCsOFrow4j46ntR7206osajOOK7WzdVAxzimXQkhN5ZQFj0A6VU/EmqdYlPPc088VaibFfKH5qo8CPf3wVskZya1GHnhewLn6hxkmrG0Y373OMdM0RptnBZ2a5wOOc0PqLQT7BG2BnnBpHNXRRR0SROr5fHpFRx3i+a6RDJPt2rtogbYeSCVH9aihtkSPcTz7UtWN0Tw2Mrl5QxO7saCe2keZmJyc4FPNPmjSHazgj71rUhBBD5yhSevFZaMC2tpONrAekVa9LvhJtg/eHaqlb6zPJhI48qRjOOlOtDlijnM0r+rjJNSyw5Fcc6PQ9PiwgJ60a/HFKtO1O2mXCyDIo+Sddu4MMUIriqJz27IpJOcVzvzQV3qFtCpZ3HAqsal40toMrF6yPah7GptaLkFXOWxityX1tCmSyjFeY3fjS6eIiJMZ6Gl8etz3CH6hmBPzT3XQqxSZ6oNatpOFkU4+aEuL+NidhFebw3kUIyJGyeetQya1Mko8uTK/epyTZWMGvRfb6b8JmPQCvOtQ8QyRakVjY7VPajLzxDJcW5hDYJHWqqbIGUvJNyTmtihW2PKMqLhb+IjMFDSHmmNxBHqFvnfkkcc1So1ijAw43DpTC21BoFHlS/pmq6E8ci4eFkk05/LONvYir3bTK6g15jZ+JUSDY+A/uKNsPGSxcOMioZI7tDxi+mXnV23QEDNUm+sppnOFPWjf/wA0s5OHBqe28SaY78sB9+K55Qk2dEG4IC0XSJfOUuCBV2hiEUIA7Upi1zSyw2zID96nOp20nKXCfzpoR4ollcpuwuRuDRNkM80qhuFmfarqae26iOMYI6VWH6Qmq0RXByxoNgOSanmb1mhpQWGRUm7KQVHJ2tQ9xChGK7TK5zUUr5NI2UAZLYAHHSkGrWxIOKsrthTSe/8AUDU5UVjJlVDyRkgVBJcOx560fdIN5AoRLffJ0qi6s6AixkbdVht3JhwaC06zUckU2SEAYqTaYkmAy8Nmm+nSL5XNJ778NTipdJuN/pq+J3o5csfZrXE80NS7TdtsacainpY1WJbgpJSNNOh4O4jy+uAYiQar8txhjuOBWSXhZTngCkGr6n6dkf61XHjbYk5qKNatrKpJ5ac4pb+2mWhnRZDluTXDQrv6V3qCWjhcm9hn7dat0taFc9K3R4oFstE4eCLAYmQDr2o3SdVu3IidcIe4FCSQytIu4EljgCmtraKQikje3t2qnSE7O7vU5oH2J6lP5sdqy5iiurLcxw5XpmuprJIXBySPnvXUVqs2euB2oVaGTpi+30qx2YnlXPsTzU9rp2mW0yujgntzWSaUsrvuYcdgaWx6eYpml3ehTwM0P9G/2WnUZ457VIEXJI60LZJLYSKqgtnmlv7QcuoiTpxk0whvmX1OMnFFWZtD76x0iZ5VIGKXw6sHfCK2AcE4pDq3iCd18lEwTxnHSs055jHl+GPvxWfJPQFT7G0+pKJ1DY3fNTm6LLiAqGPT4pTc2cWBIz7pD81IqhI98kgU44Wi2qMlZa7KZRaYlILDrXCTRQHPGTS3TZIWh3PIPtmgNRdvPBVwV7jNa1QtOx4uohZuFBHvU4v4zOI2AzSKKZVXfx6R0zxml0erKt88jt6VH5qKZmhD/iJJu1AKn6V34P02KNfOuByRnmobzbrWuGUZMKdKstpboI9kQwBSydBgrBtTkluA8dqCQOworSvD99LZLNIh5/drCTYSgso9R6mr34cv4rqy8oYDr+7SJqyjtIqMiyW1uYViPmEY5FBfs+bYfMUruNXa+2yT+pArLSvWpY1iyXUEdhQboMVyKyLcwjB6CjkME0axyEHtSyTUQCfMII7Utk1FEYsGOaCmU8LLq0FpZ2oIC9KVSz2+d/mdO2cVVrrXpZPRuY47UJHc3l9KI7WJ3f2QZrfZjKMI9luXWUt5C0Uhz8Vt/GtyiFBKCKX2PgXxJqMfmPEsI7eYeabWf+FV/Ki/VXoRs8gClcU+2byRWkhFe+JZJ875ODSuTU1/dXmvV9O/wz0a2iYXO+dz3c9K6b/DjQSCChBPQgmhUUbyv0eQvqch4C9Ki/aMrdP6V7Ppn+G+hWchlnRpx2EhyBUeqeA9HumQ29uI1B9W0YouUImjknL2eNG+mPGcVz5079Nx+1e6QeCfD9jbhzaRnbyxbmoIm8KxytFCluH/AIcCleaEfQ0YzkeJxLPM22MO7HsozRZ0nVFjMjWtwE9yte76PaaMvrtreMMe+KZvDA42uibPtWWVPoRqSez5wWCTHqLA+1aMZH75H619DnRtOJJ+kjOe+0ULN4Z0ieMpLax/fFN5P016PAwjj/mGt7ZB0kNe2N4K0aNw0UKnnoaUeI/BtosTPZW/4nspoPJEaKbdJnleZ1PpkNdiW5HIc16Jo/gyC9t91zG8Tj5xXE/+HUm4+Tc8dgaZTi0aVxdWUAXt0vU5qePV54uu7+dWa+8CahbpmM+Z9hQMng3VUTf9OGHsDRXBi85r2C2viW4iYFJnQj5p9beOr4ABplb71WZdHvIc+ZaTADrxQrWu38ysv3GKPiiw+WXtHolr45dseYgI9wadWvi2xlA8zKn5FeQeQ6HKualjmuEPDE1N/GvoZZo+z2QataTn8KVea7MikEqwNeRxalKh9QOPfOKZ2etuv5ZWX4Nc8/jS9FYygy9zOSfig5omYGk9vrcrYL4cU5tdTtJV9TbT7GuZ45L0X16FElm5kJ21Lb2ZDZK06DQufSwIqURx7cjFDbWxnOga2hwM13K6oO1D3NwYOO1LJr5ScbqVA72a1KbKnFAaTemO5KCtXMwcMQaFtV2zbunvVoRpk5tOND7UrtmiOPaqtcSlWLSNgCiNU1iGBWXdk1Uru/lu9xHCmulYeW2cqy8VQdfamSjJCeKU4ZxuY8n3rEGAB71MELEADpXVGKjpEJScnbOFjwQOtShBmp4rN2bIBxRlvpjtjIPPxTCizyeayrD+ymXtWVjBJneQAtGFI5PuKmhmVY90hO/kjA7UIPrLqfzDhYh0+aPaDy4QzAuznq37x/tWf9MtkbXTXDqAORwc9hU9vcoJWQNtUdTUE1q4VjbQ7vfmlyRSAndlS1FL60hW92O5r+GFJApGW6n2pLOyuCUk4Y9M1Fcsscflp+Y+5qTTbEswbH6k0VCg8wq0txjjpUrjapIP2rqRkhThxn2FDNd7kwiEmmFNw2gdjK3PtmiEQLyW56AVllJIQBKjAUXBarcXG8EhV7Urv0ZNI5ihMcfnTLu9gRUAh+tk39F9sURPI8t0IYzhF60WuzhIweO9Di7sNqgX6YxqAuAPipEtw2FYduSa7kfdNtHQUREQDu4o0CxbqcCpAy5AGO1Ue6d5JvJg3MScVZfFmoLEhWIEkjHFLPCunyuWvLgcexoGTvQy0fTxbxpGVPmN/M1Z7a3giOyTKOBnkcmjNCt7O4gF2CN8Z79qA8UanaGVGiIyBztNLJlIRb6B9TuI3Qbl6Hg4oXRtVGm3xumB2kY2Z60j1DXwYfLUDA6YofSdL1nxFNs0y1cxnrK2VQf70ivss1Fdli1jxp9Td7wnlxg9B1qralrpuJWKlsHoCa9CsP8ACmwVE/aeozSTH80aNtUH4q46R4M0PTYRFHYxkj99lyT+pockDyV0eIaZouua1KBZWcrKR+dhtWrRpP8AhXqcsiPqsscUeeUQ5J/WvWpLmw0lCpaKBF+wFQw+IdLupBHDeRueuA+aSWaK/geOSXqyv2v+Hvh21wrWvmMw6tzTcadpWiW4e3gjjC8k4ou8mluE/wCBYbl9xVO8Vadrd7GfppsYHqXoDXNlzNdf9l/j4FOVSdFktPFGmzyeVFLz24pit9C3JJU/6155oGi6rAc3QTPuKtyxHaokOdorlXzMik7RfP8AExRf0Y5FwjcdailcHgDHNLYJ/wAQru5HY1JcSSBDsI344zVP/K5I5vDT0GySljjOB/rUJcq3/TQFiLyRCbrG7PG2talBqMkJXT1HmEcFuKn5pzVpFFiinxbO7+5UoybuCOhrzm40GePVDdqQF3ZxmrCug+IrkeXNcRAg9gaEufBXiKZ8nUkVem0Cl4Z5y/EejglhwrckNtFec+hgoTsQafrvEeFJb70l0fw3d2cPlm7LP3OKcwWF3GCGlzUIQzwdJHPnlibtSCFdwgycH71iuQcsSR81BLb3MS5IJ+1JrnVZbXURayLIxbpxwKs82SPcWQjjWTpjPVVXyw5maIDncDXGk6jHKGCTNKBxyK4vNLe7CNdsfLxkAGpLO3gSLFmUwOuKRSy8+SRRrGoVdjWKRNmeFz2rtXjLgbgT96GWCXYNyjn2NB3UJtw00atvXtmu7zTSujk8UZPsc4DHoMVxmNiVDDPtiqdaeJrr6xo7mIxrnAJ5p9a38BJchST3rR+ZjbroOT4s4djF7aFxh41P/wDNLrvw/p94hV4V/QUxtp4pF3IwNS7sKcjBrrUk9pnNT6KXeeArB1Pkkxt160iu/At/FkwOrjtkVb9e8V22kSRwzRSSM+RhBmoZfEN95aT2+mSyREdFIyP50PPT7Lx+Pkaso1z4Y1S0TdJbBh/0mg5NMuEj3T2kiL74r0qCa91WNWRHtiDlldabtbiSIJIit2OVp4fIk70TyYuPs8XW3bP4UhFFRG6j6gOK9NuNBsZgwaBfuOKrF94curVi1sfMTP5T2qylCXaJqc10xLb3bKw2s8bfNME1S5j5Zd6fFRx+V5nlXMe1vY9aKj0tHy0EmPZSanP40JdF4/Jf/JC++1JZ+mRntS8MzHrTWe08tsXEHHZgKBuNP3KWtpDn2rml8dxei8ciktEEk0cSDewpXeawApjg5OKF1G1vVlxMp2dsVDFYySnKocVWGKPbObJOYv3SPIzSZYk+9G2lhJcYUKRR1rosxcb0PJ44q26NpPlP60ABHtViSRWbbQJXblTgdaa2mgLt3Bf51a7a1hjWR1HI7YrgbRAxKkHP/ma1mE/7LSOJdwAJP2rprMxyooXj4PWmEvrMatx9ua6Ebef1UrjP3obMCvCA5yAf06VlTQwtcyPg4C8YzW6xhAuBaqo4bH9ajEshG7BEa9KkT1jb+8f6UPcSeWhjHb+tWcU+yCkzLXVJoZHXClWOeRUV3cl2J4UULbZmkJA4BrV0/q2bTmskg8gaNXkut2crTZFfytqPtJoeyh5yw6UZM6xIOxbpWZkwF4vWQrkmmVtbrDEGbgt0qG0jV5cnHHWmmoXFi9pGqsA4I6e9ZugpWBSliVjTJZj79qPkb6O2CD/Mf2qKyRSTcE8DpXcQN3eK557AHpWTszVEcERiUuw/Efmupp/JUKg9Zpjf2UtvD5zAYHSt6PYRX0Jkc4lB9O6tdA7ILGI7R5qnc3uKYXOnPb6e8oUk4yKewWSNDtnQKyjggVxNcQG0MYkXaDzmkbHSKP4fNvqT3NleQZkBPLCppZLfRy1uAroB2oTUtRgsLqeSyIyx/MKp+oatLO7YYtk9SaTk3pHRHGoK5Dm/14xFxDIUVuqqar8l1dahOkMIZ5HOEQdSasHhXwLqniGSKeRTBYlvVI3BI+BXsGneE9B8Pxxz21irSR4CyEZP3pW4x2xXkbdR0UTwv/hbO7RXuvSqFBDG2HJ/U16pYwQWqiKzgWKMcAIBUC3BmlxGTnqQaLdlhC5OCan5L76A00RT25WQPEFLZySetdST7427MK4+utlm8t5VVj0561uWRdxIH61LlGnTKcZatFE8T2d9qW6OKLzEPBL1WtF8IalaX6OjFFU816tNtEJYDcR2AoW3cysS2eegI6V50pSh9b7PTx/JfDUTLJJIYhl8nvUx3OT89jREcJOFHNEJabc7iKeOKcjjlljdsXLDI2Nq855ohbWTOSODRwMSDIIAriWcCMY5rpj8aNbIvM/RBHYIDvYDce4qf6ZEBcrn2rSOcK2eO4qCSeTziiodh71bx44roTlOQRDKgbBTB9sV0WDHcowO2KihXkll56VMiBQMkAfeqRqtE5N+yDzX8zAUY7mpEUyZ25/Wsd0EuOAagm1BYpNkKNKf3vL7UHJIDYX5WAMDn3FbA2EDjNQ294JgWVvT0we1RyOZGGGIPSqclWgEkjYf1sBmh5oYJJFYxKSB+YrzSLWRqSatHApZuhLoMqF+adzzCCJXznAz96k6baaDDI/RxdqZItucD+H3pYbCWCE/QDaxOTg0uv8AWJo9RtE5kkDb5I16bKsianpzRhknUZ65OP0qMscZlMfy0tIWWMt6kmbrfx2qe9upJYpAFIOPamJlZ3Bj2lCMg1wxgkjkDBS4HSl8LUaUiks6T5Ueb32pXg1JIGtlKZwX6mptZ1SbT4o2UqFHan0NzZRObdEjkuMk7WHIpFqmkXN2rSS7TlsrFjpXBm+O1JN7R6nxvn4syTeqGegahdXcQkBVdw4FWbTpbpxm+2nHTbVS0OxubdB5q7VHsasUcs0bgqRt+aX4+dY5NPoT5cYyk3E7utJtru/E8pBKnhSKJljUkwwvgfA4Fcrc+bkkAsOKWnXz58lrDaMzoOWxxXd5sSto50ssqX4P4Y3SMdCRwTipGyE5GKr1t4iaKPFzC+72ApraalHe2rNCrKw/MGFXx58clSObLhyJ2yfAZc+1RPEfzdBUUGpW8szRiQFl6gGppZdwI7VVSRJwcXTFGqaNaXiZdMP2YcVVNQsr7RyZFJeD3q/8OmO9QSWy3MZjkUFCMHIqscjQropmn63DMNtwAfuOlHS6db3SiW0cBuvWlfiLwxPaOZ7Elo+rLSW01C5tGIDkYPQmulZItbAovtDu5tpE9F1CGXs4FBLZCP1Qepc8gimlp4ginQJcKD2zXU1nHMPNs356lc0ksd9FI5X1Miie2by40wGzyhptCwE4UjPHtVek2s22dAjjo4qe1vHtmxc+pP3XHapO4vY7xqSuI+k2eU2w8561BcFGSMEerpnFcwyxtCzlgQ3cGu3UGJGzgCiiIJcQs1woI9Pt0rUBkjlk4ZkxyB2olzsuVJOVI7iorceXJNJ+ZaxmD2jIJJNhxk88VlTQ2gmZpjldx+1ZWAVoFbfC7syMPUfak1/cHzW2nOTjip4Y7m7UsgJP72PaupNPmiQTywusf7px/WrK12SlXoj0ydLVw8y5UHP61k0ou7wyKmE/dFG6bp8V1fRQXjGGJxkN2NOtS8OJptsLi3k84ZrezehNGoVQveoNRjIZc9T0FTXIl8jKDAPU0LBDM8yzOxbsorO/QVXsKjUpD6R6jUK2yTTruByKu+htpktoILmILL3OKG1XRAG8zTGVs9FoWaqFigGP6dE/UURbWUkUqYBG3kGu7azngCtj8VSMo39abX8kVrHHPMSoYDkdjQbo3Z3tbUbdrVuHA796Rok1vdrChKBTjirJZlboq8LAyAZyvcVHrMVu0X1MhEUkJ57bqFjKNgo12TTplS6jMkTDk9xVO8Sa7HJPKLY+XETwuetQeINbMrtg49qqFxO9xJjqWOAPep7kzq+uJf06u7qW5cIgJzwFUZJr1j/Db/D+1jsU1PWrffcScxxOOEH+9df4X+BH0z//AF9ZjQysuIYm52D3+9X2TVrdLlYWIQnhRQnkjHRFKWR2HJCiIEiUKoGAAMAUona+tZj5zxSQk8KFwRTxSFBYnj3pbqEaXL54Mfcg1Ka/Bsbp76A4blmuPw7UtuGfM7CmTR7hh/agrGwSzG2OSTacsAT0o1nKjGc/epxvj9h5uPLQnk0W1a6EsgLsDkNnpRV1Gwg2xPsPQHrU4AI5613hTtGQM1zcFuirnK02A2MMixASy+YR1OKNjtyTlhipkiKZ2qAPc0VggDdg5FUhgvsSeVrohiXbkiojMFLAc1lxOI1IXqfauILUsfOZ+CK6VH0iN+2CPIZXwykL7USoAUdvjFEmOPZ5mTx2xULOJHAXAoOPEFtmxF+8eBigNX0+S/ts2lzNbTr+Vk70xUPISoIOOKA126S20mZhci22oQZT+7RcU1sWUtFIvTr1tM0B1qQ+X+fbj0/rXF3rt0nktDDdTBRhzvHJ96XxXlklnOIb8vMwyWblZWqvyatrskpWO03qveP2rnjjl/xPOk5Nlo1vUdStba31czm1OcLa5yzj5qw2N015awzaRKSZB+Jhujdwa8uupb7WbxPqpHikjH+Wwxj5o61vYrX0QXzJKBhtrEHNGUU1RSEnFpvZ7DEhs1UzlQSMtzRAurVtrRSIwI9+K8xlvb8wrcTTSeXIuFHmZoJricQCZGcR7tu4HvUn8jj9aOjy36PWvqlRZWdgCRj71UfFuvrpsSxQ4dm5+woLXrDUI7aKa3uXlgKq7xu3OfiqZq0k9xIXnLFyv73YCnnk5KieST6G2ma/FDJNcTQ+ZcsPTLnOfihF159Qvp4L6MQRsPSUpFDvV8EHI64pzpdjBcypJcZ2g9R1NDnw1LZBRLzoniBbLw/IHkFxJCdoB4OO1MLK4dJEOoR+VIwDHDZ9JpFc6Yktg37OjbbkeYz8YriW6W29N3Om84EeGzn4rRzS6opKT/R3q7adY6paXnlHzEJadyeNnbj3pZq/jLTp7wG2jIjHpy3GTVe1HUFt9SA1ENOJ4ysS7uFbtVSW1kmuPJJwxJz8VaVy7FUnVI9c0O6hmlMLStI7jKjtVkFmFQZry7wxFPaXCyK7ekYZiaut3qV6LR/KGd67Y2U5zU+GNLo7vPKMFsOMUMcsggYFsZIB6VoQtEu4ptLHg4qpeHNXjstUWO4cPLKxD57GvRvqbaWJCGXkcmpxwQn9noti+VKSFFxCu31KAx6mkGtajPpbb4pNsYHq9PWrk0G7JADCgdS0aO9gxPGCCOmKXJ8VvaOrD8qMX91o8gTXZl1z66Fti7vV7EV61ZTfUWUcu8ESKCMUnHgHQZXHmI6P7BqdWmnQaZFtUl404QHsK6YxcRvkZsWX/Hs3AGjfByynrRcTABj2qrSeK5m1P6C2sHcs20PjFWFBcQIv1KqCRzinhJM5MmOUf8guSNLiMLjr1qr694OiuvxLX0Sdfg1ZgTs3RnJoNp9TW6jC26tCfzHPIp3OnoSEWeWX1jPpshW4jZcHr2qWy1GSBgUY/wA69ZvNNt9QgMc8YYHrkc1R9c8HSwP52mqWjHJSrxya2G4t0yGC7ivE2zYDHvQ9xA0PT1xn3pJI8kMxWQMjL2Ipha6kcbJRuFVUoyWzOLg7RKsskQD27Ex90NMrfUFmRI1PGeVPalkyY/GgPHdaG3biJISUmU/zqMouLH1k/wBlrkCNOoPt0FQxkKJkx6eoJ6Uv0y+kvrvBwsqDlT0P2pmp3LKH/P8AHWsRaa0zm3kl+nUnjJrKkjSQ26BU4FZQCVvRL1dB1BopY1lDr689qu1rfaZq9uYowuwjlGHSvLJpGkk3yPl+Czf2ozR7zyrgb9wDHqD+WrNPsha6PQjptrDGUvIg9oPySAcrUiWDwQu1o4ntSOVJzSqy1e7s1eKdVntn7t1xUN40lvGNQ0a5LQn/ADIQeB+lKEi1fToxp7vCdsZ5Ze4pf4etFupldj6IzhR703OrTeSv1tmHhlH5x/eogsVrKskC7YxycHpQUguI7fTrdX3qQocfyNCfs2SMlo5GSYH0+xqaOT9qW5FvJ6SMYPau9Humklk03UwVmi/I/uO1CwgkkUs4KXX4N2OUdTwaH0y8e4nk0jWolQkfhOejf96dTxSW034kYmjHIJ6iuLyG0v7cGVcmP1Iy9VNGwUV4Raj4b1XeR5lu3JA6AUn8Xa+byY7PTGowopp4m1mU2v0xPKfmbufavONUvDI5G6kb5OjphFY48mC3lw0sh5zzXof+F/gm5nvk1TVLQpbIMxLL++ffFJP8NPDE2va1FcSRKbK3cNKW7nsBX0IgEcYGMBegHai9KkRk23bOJwrQCLsB24xS2PTIjOXZjg9M0Xclzyn6Ut0364Xk5n3NE5yoP7tc+RptJoriUuLaYdcWz3Efl+YQh9qBl059P0+Typm2jJG7mi7i4jSdAzMpHQ5wDXEsqnMTSFkc5AHNTmoMeDklsUaNrVtdR7PqQzr+YHg5pwGJPXINLH0qz+o82O2TzM/m6E0zjjIGT1HFcylPplMqg/tE7EIJyTxUywI0gZlyR0zUNqJvOKzMoT90KKKhbkko6lSclu9XxR5KyE20dOxDRrzyeuKivHYIcYJqWOQTDcu4dsEUIS8kwj3YXPU966GTRlpEZQpl4Pf5qSeYh9kWAq1k7JCvqk2/NBxOsrPMB6R2bqaya6QKfbJzMxj9vcVylsEVpS3XnFY670QjA53GpyF8sNuOP4QKOn2C6O+I7fdEOTzQ30MbwzR3CLLHL1VhnOfigfE+rrYWRiUus7AGJtmRkEcUkuPHDkI9lZjBHHmN+U+1K5wUuJKWRRCp/BGlRw3IggTzGUsEHxVRGqWOmh7cRGIYw4KnIpv4r8Y/st7OaC6TzzDmURkNjPahtI8ZW+qKhvLW2SQKQ5dR6/bmp873E55OM+ypanNZajeW8jeaqM4QyAEA/rUmneDrmfU5YDLHDAG3CRuSRT7X9ZjmiQWd9EIFH+QsSgLSOPVJJmx5khOeQi5zUHlp9Cqag9F2XQDZ6YqfWGSMnbtZQSftS+8OnQJutYAkUbgZmYZd/hRU/h2Zp4S8rv1JbeeEx81X764t4bqe7YxufMLRheSBU8srD5uRZtNuoLpSb8kyHJUE4VfYYoHXreG61G1aWCONgjSSbeSwXGP9aCtYXv7SK4hnGWORGBkjHvR0tjJLYy3jTEXhXyyT0UDmq4lJxSkh5p+O37KxqltJie5jhZUJGAFwFHvml73ssVr6XBKvkY4rv9pXFwxheVmZmyfV6T7Cor+xG9VMp55YAcA0cji+zmv9JrjXJ5iIprqZPTkqWpbc3Uk8QPmggNwD+YfrRYt0iiMrKCUHJPelFvJDLdAyZEZJCoOWzRhFNWhobDL+d7pbck7pI3HqPSpjLbpexct5rn1BDkVLfWzQJiVAjTLuUEcmo9PtL2BhO8RiZhhTIMZFNzVbH0ns7muLie5WFLgrFnb6TgDNXCLxJYW00Onp5gEEfEnu3zSTSdLtJ5CJ5fKKZfOeMjnFFvoEQYajA0m1z+dhkNTRa9Aa32LNWka7vXuIECAsDx3PxV+8ETTXFmgu0ww43HuKrlnoWo35jZZrf6YPk8eqr3p1otnEsYPTpU1V6OvBFxQ7UjgL0PWu7ltsZx1xxQsTqOc8jtU4dZgVx1HOaupJqjoXdsXaZLNcW7yXUSq+4qAOuPeu2AQcktzwo70fBGYgcD+dRzQoASDh2/pRjFpbM5KUrRCkNs0qyGFVkHTiiZI1kjIkGaDYCORCzEnuaJkuozjB4+K2kZuTeyBIwqHapA7bq7WYRqDMQvaiN6MBg7i3ShL2FZF2uKZVQH3s6uL6K3G9myg7iiIXinjEiHKtzkVX4GSyuDDeQEI35CDuU08TaqL5K4U/GKSLbY8lFLQm8S6BaajAzFPLkA4dRzXnuqaHeaUN5QyQ/wAY7V63OGdCXbp0FLtQS3NoVupAqNxz0NUUqBFs8rguXTkng/u1kreYfNjxuFS+JNFm0a5E8bebayHKuvO2gIpF2ll6d66IyTWxmrdxCklaUebC3lzp0Ip3ol6JraZpmxMg9QqrSStG/mRfqKKErEJc2rYcdR7jvUpRcdj6yKvZcLOacxblIKnpWUutmFxZRSwS4V+cDt8VlMjmaadFIJKZJOQDwPc05t7RIdIW8Z83BfBj96Fsra4vmSY2ogiUbkVu9GxxHeLiaN/LT8i+5qnK+idV2N9NMepWEmny3AS827oef6VX9JuNQ0e/kjmjfg4ePBINONL8PNPH9fczm3aNi3mDggewrubxB9ddLZ+SVBO36oLzj3oNhSsbvfrZokksW+znHrQ9U+1d31lZxxQ39pOXjJyUznI9q4fS2t4I1E4vCWzHkdR81PfrDFBHbJbkM3MkUQ5FIx0dq30lqbmOIjefSvTFTziR44pZiA7cBgOTWemA2lpl23HO5xnaPY0aQ8l4zEIbWIcr7fNY2jiZx5cduZGyR1HJWl+qan+zYRbKm98cuBxn5o2A+WlzqC7S3RD8VVvEl2EjjgUvwm+Td/EaWTopijykVTWrwl3yc5PJqtMGkkPGSTgUw1KUuxzzk0b4K0c6z4lsrQBtgcPIQOijnmjFUrDmlbPbP8PvD37A8PQRSSB55vxZMDgFu36VZnBKhRxUEl1BZrid1jRBgFqFsbuK/mkmgMzJGduWBCn+dTclZNQlVk0u2KTaTnPH612jIrBTnPagLq7aWZlFrL6GwCcAN9q4uNPt7oJv3K3VfUQc1Plq4lFH0xiwV2YjYSv7tCyzxoS2DuzjAGaEsb61lnmhhI8yIev0HPHU1jWzy3W5n8yHGRxtOajkyScfqisYJOpM0080xd44HQKeM/vUbpqvNBukUjJ5BqVY8qATtHtRMGQQCD1qePDU+UmCeT61FGeQFjG0HJ75rp2MewPkkntzXYYbiuTjPtUc25GU44J5IPNdqSXRz3fZkp2ncARjqRSsKLi6WaN22ofyrR12HYHJ2gD8tD2CmKBVO1BuOCOM/FB90ZPVkGpENG0hkAxzgjkVqDyzATzIxTK1NdizZn3opI6g85paHhiuBHBLsjPJUDpUpNxZWP2QdaPJs3TMFIPSjI3QsOu49ARil0cLNMGXLRk9TycUg8Ty+JLScNY/i2pyS9vGA4H/AFA9/tWUnxJZXwWgrxZra2NnJHMwjkP+WMZJPevFtZeeGVD6wHG4DODXo1hpl3e7ppEkO780s2Sf69KV+LtDTULeMaeZpp4Rt9Klgfg4qWO3ktnLwc9s8zubmV5AIy248HimtpAbe2USzYmk52hugpvp/he4jvkiuYip27mLDkYFVe/MguWllXaxPv0rptT+qJT7qh5YTBb6MCV0wCGkxu598U7uNQt7XIlJnl7Ki7M/eqhpN1+Ohkdg45Vh3rd88ktwxYMCx/eHNRnhudMVxstM2tme38uZ3hiOPwEG1W/3oN205LreYRHCOwyc8e2feq8zEEck4AGW/wDOKZlZ778kRBBG4Acr9xSvHxHbjXR6DpHi5rbTmuMxTBAxCMg+/bp7UVc+IND1hJkeaWK4kgBjiKbIxJt/iHXmvPr2yi0yBWaRnMoH4KqSQO5PtUBuJjCfLwqlcAgYNG2CO00w660jVbB0mjtllCENuQ7gcUmluLwO1wxaVGJOGXj+dXHwtrupQ362k9wWjiQkRNFvB/2rL7w/cW893qcHlLHKw8m0t+jMeSxB4p4tJAlxKC+pXNyVSVsIOy9KJtJo4CEIVC5yZNuSP9qYXNlDK7llRGxn2GaFn8oJCGjjDIeXGckU7cWlQVXSHuj4815RCskiLlHkkrT6xcXVysMtsgAb1d8ClkVwkYYiF5vZo3Ax9xQbR3t1JM7RvHHGMyYbBI9iamoJ9i1bLpo+pWiq1mBD6j5klw79fZVFF2V5a3MItBdSjBbCCX8pPcL9q8/t78w3EIhUkg42KuSR34+1W6xmgtbt7ya2V2jUhG43HPAH9aE9aCo06RY9F1G3sJpYizm3I9DMeSRjr9+f5VZ9NuWu7czOqjLHA+O1UvRLAXjRPNtWPcc561drK1jgUCIHFcsefs78XL2GKAccgZqZGxwGqFACDiusgEe9PyaLUGpcDAUj9TXflb8ktkHvQKsWGOvPWiopAuMnj2rox5b7ElCujUlqGUnGCO9ASjaDG/5W7064ljODQlxYpckBj07VaUU0LF12CxFVKBM9O3aol1aO5ujbWmJJFP4m4cKK51COSEYQiNegbvQel6L5V5LqD3MlxM3C9FAH2HWoVKLpHTBY3HlJh9xFFIjHIYg9M9K70+fzQ0boVKfu/FLrjwxH9eb63vJ4ZCcssbZB/Q10l3Db36Q+eokXqrHmqpv/AJaEnji19XY3lmhjkVGkUO3RWPX7VEfIvAyPEGwejrxRKrE53BQXHIJqGKUecU5yOTkU1E1aVoB1LT4J7VoWiUgjoRXmHiLSf2Q/nQHbGxwyHoPtXsEqb84Bqp+LNOgvLKaCQDLJxn90+9OtaMn7PNMKFyWyjf61xaTfTzmJj+G56+1CQ+bC0lpOxLRtg13PGRHu53Dmrf5KmMnxfJDQ30uku3l8xSnO32PesqK2kF1bKzdRxyK3UHKS0dXihP7Bk2pzX+tiS3hdbK2UqEP71NraT6jbqV7+FCgwkJ43URb2lsImmnDRwnO1F6ufelrSRPh7+RIoYMrHFnnHv96r/o4a/Tm+179ozGyh8xYj0CDINcadawWF0z6mzswP4cZ4H61L9fp4j/4ORUCfuqvqesjvkXczWXnSnGxjkkVmzJFis7l9RvFRI1WFOQBkKo+9MreOKeWa+XduiBUMDwarMFprV1AwkmisYScsT+bHwKbz3djptrBZWty8ilgZHU+pj/asCg+KaO1iaaeRjLcf8tl9S/OKjkmfT4o184SC5fO9l5A9iKNTyJLlJUPmiCPLADJP3NCx3DBjeEhlYlTbsn8sUDBGo24lljhgVGhx+Kmcce9eb67cF1lkGQJGJUewHAFXB5LjTba5vZpkcTRNjGdyH2qja0cRwKc9s0sjpwKk2Vyc5lPQ/Br1j/ByxWPRru/j2/Uyy+WC37qjtn5rydvz5Pc969s/wjg8rwwHJBaaZm47CtTqicmuyzWWiW8N097dO9zdOc7nPCfCr0FHXUkm1orZkSUDI3DNEEjqM1xIu7gj9cUOKS0S5tu5bElnHqHkut86u+7Kt8e1c3s8EwksncJcMhMe/v8AOaZSLlWz/rQckfnAuscbSgYRmXOKjxqJaMrlYr0bT5oVBvpFluIzlNhwcfNWNeRwrDPOM5xSrSbkG2Z7xRG25s5YMB8ZpmjbIw2MjqPmhh4qNIb5EpSm7JNmVILcHg4qOytooZJNpYmRs4LE9q4iuXuGLGKSIZwFkGP1FT27ESsAPT7+9UUY2QfJLZPIhOwjAA/pXMqZbjk1MRkYPSoi21gp3Y96o6J3YLe7WjYqGznqaX3FysaJDET+blu4prMB0UMSegFLiFO+QQ7CpyfckVORSL9gptYzKs7PJsK4yW6mtJp4gLFFZtwxvxnHxRE6eda8Flkk6YPSpIwYLUGR/UvXAqbjuh09HVpiJNnJwONxoqNVAUTchqHQIPWCMnqSah1KcR27S78bEJHsTTxdISSsT+JdSWHbp1k4inmb8w4AHz8080PT/otMjgmIO45+5NUO2ikuNQF/cRzSrkEbF3bz8UXrmsXqyC3lle0UDPl4yP1NTU+P2aEzTUFSHviG9sIcWy24mmcEeYE9MQ/93f7V5Hqfh6+a5uLwpA1rypYLjI9j/vVr0aC61TWYkiYSpGA2SNoB74FNv8RdNvV0/fbiNbSPDMgzuf346UFkcouSRySjN/ZnkVtBb2N6ktzuEJfBZfU0f3zTnVYV1SV5NKtvMRfzyqAAP196jdY7xdjIhfuAuN49qs+uaNeNb2ljaeVbW2xQlrb8cnux70qyOS32HHyekUaxt9t2juCz5wke3J++O9WNtD1W5uTPHH9MGGBKWwftjrn700HhGLRvp7i/n3OGy0aybcLj3HIzQ2qSWjz2TrassbKSmGZlLZ44zyRjmhKTJSTuirXYn07W5LWeNtRYkD94eYW9sd6c6vpUtiIjd2lxb27AAyuh2g/wk9D/ADrq4vI7HXoru3QYWMMWU7Q5PAH9KbnWbu7YyXkRa3YAeXECqDH8S8hv6VpzXVG4t9EOimw0y0nnZxI00LJCEU5x757V1NcajrEVjHZxxCWGE+gNyTj3OMcCgr2XTr69kWaRUlBBAY7ckex49x/KgJNZe1sZILJJ4m/KlxnIIB/pQSbE2ns3OJXjN0sSheA+Hzz/AO3qKaXWiaZJHaNc2xiMmA06NtCk9M0h0+5cQeuVlkydrKeo/v8ArVl0XxIo02907W905eJvImK5JOOFPt96orR0qS2G3PhnS7aCJEtULY5cSZY/OaCsbO1v7B4bsSRo85V2hO5mUdKLtPD0h0KK6vbhSgUOy72yo7ciotL1+0uLyGys7OSLBIzGQAcfBpP8n+EU9klr4P062aV9PmILchmHLfBPb9KbWWi2io4uN/mAZ4AK1zNqVtaTbLlzbNngzJtVvsehpKNWtNXMv1d4I7US+WkBJA255d8fmGM4HSmmk9llll6QZcp9GgSOVgx9Ss3t1pXr+p3lykK2E14Jl5ZIC3/yOO1XyP8AZMwWG08lxHgDJGG3Dg/OR/LpXD6HYJcJNFGElAIzExQ89elZYk/Z2cucADwv4ptdQsIEubgC7Vdsm48MR3zT17qGNgZZuD0Paqr4h0cyXv1FvGVwig9s0bpVveT2qpcIGiH5HLeofFc3yI5I/wCKDBySplmhmjmB8qVZAOpQg4qdSCeAeO9CWVpHaxYiXBPLH3+9FINuOvNaPLVlAqCQID1yTRJHORjHvQS0YrLsGWHHzXbilapkpLZEsRmiK3AQnPboKrd7eLpd+lu0gAcFlGcHrTk6lCNTW0YSqex2HYx+9A6z4cs7y5bUz5y3iqBvR8en2x0rSba+pWKUX9+gwXIlAjZGkWRfzf2yKT6lcDTLWWa4tx9MgyGLguG/Wp7NhalYSwXcPSpbCn/vQWteH/21a3CSzCORUxGcng/Iqc2+yuPhy30FaF4j03UYlWC5USjhkbrRh1IpfG3a0uEOMq7AFCPuK810LwjrNrqKTxztAiSYMsY/MPtXpc99FbrBARLLI/BYLuGfcmmUm9D/ACMEIO4bTDkk3Llcn5pXqsZlhbCAnH60fB+Q/wD1Q1zJh/LccsDjirf04utHivjSAW+qpcxBk870N2yR0oBXZ0Bc7+xq5+PtKM+mTMQN8eXQ/avP7GXfGNznkZ9NWg9D36D9Nu/IllV8hew9qyl83pk4JBrKZwvYvla0XbxBPfvci0jUsEH/ACh3oW38N3Do0l25jZv4jmmL6zaRzvJZgBZBzPKeW+1Mrlgtqbu5GEONoz+ap9bNd6FcWk2VvGCkckzIeTnCj9a3NqE0BC5ghGOGxuIraz3OpjZ/kWyHPp9qDKQl91uqRQ5P4sq8n55obG0TvdRXiHzr26uZDgYjGOP0rGhy8a29qXbGFjUer9aWveW8N2Pp5HljU8gcbjR1vqGpaq/0ukQrHzyyDlPkmmoWxhbanPYPsmSWHs7bRyPY04sNbh1S8hhtYyEjyfX1NU268nTZJTql99TKozsToG+aXReLL0TOujWgLOMN5SZwPv2rUzWi/aq009lqZDKqxxOBgcY/3qmawMxwMehUVZLGW9PhuS21C1jWe6B8oK3qUdctSC8XztGhlA5UYJ/Wlki+F9orcic8+9e6/wCGSbPCliDtUsCQP1rxC4X1tj3r2n/DK5Fz4egYgboSYse+DR9EJ+y5eWQu0nPOcityDcvPA967ByOTUE8yKhLONo6nPSg6XZNbZAThG8sjP3qIqVi2EBSw6E5GaRa/pmqajLG2mX0cMCkHaGK7j3yRTu3jkWNElbLIuODn+tRt3s6JRUVaewCOGSK+ijtY44oX9Up25P8AWnW3DbM4Xtj/AEoMzTfUxwiNcYyz9gKJYgShCck8jBo40khcjk6OSzLJs25Huf8ASuomUu+052nH61zLIokTnDMdq9+cVHZlhHzN5vJ9eKKasVr6jHcdgb3qGVOQ29ifg1rcSAjk47YqXAAC8t81TslVHI9YXeCAeKA8orNLgNnoO4o0hYWy7ce57VG43BmAUIeh96D2FOgCPeD6j04wetacAoyg4A7DqaKdduTH6eOPTQgUqF8wu/PXFJJDpkoRBHu3sWHPb+VCX6PLazNDGXcIeKKkuYLZFaVgqnqT2pdPrdgyyB/OSNhy6jkD3pG0gOaT2zvw3GY0SPcqFBkHbnJPvTPVNOstVtzb38Ksg9QI6g+9V3T72PJRJAeTtYN+Ze1N45FYbmYn43ZoRyqqDKCk7CrPTbPSoVFjApJ43E/m+9a1n8SyLBEcqCQknRvitJdFYxnb04U9ap+u+I/MvnilURwRAKcHJwSMnNGc4qNJdkJzUdFH164ht78Iq7DuZtsY2hSfjtV28La3oK28Zu7qOK9tkCvJIf8AM46qe/2qn+NINPk8yayS4ZvM9ExwUZfaqjKzmDLNgL1+KjhxuK2Qi2tovuq63NqV9qs6P5e+NfKBUNgAn+1VRrp3kjDOy7XJQrxg9Swrqyv3zITtBeJVYMeQDmhdKtm1K+ETzLb26fnlkbAxnoPcnPSqcb7J+7GPhzR7jWdRUWTlY9/IJJ4z1wa9QutFtdF02WMZdWU73c5ycHke1VTR5dJ8O+JLAJN6ZkclkfKA4O3f85FOfFev2t5pNwkFwrXKgAp3ye+PbFB0lfsvjarZQ5IbKGb6m7CyBuVVxnP6UQ91f6lava2VmiW54DFccfHtSmGKaW6827QFRjAY4p2NbuYmigtrQPE5ChFJBahGvZOMYp7EL2N1Degxx53H1xNwR9j3qe5R4JArq6EEMA4xmm0995qsl1BG204Clfy0Q+q2c0KWuoLG8A/dYY2gd89ae7GqLfYVa3D6vohiRpAA/qRT6TjjBqvaSPo9cVmxhWIGe1WZL7TbKSaLSkH0c0YGzP5G67hTHQLHSdR02W4urYfVJIQWBIJ7ikv7UMoqTpAGv3vm2KQBVdi2Sje3tVMu4Avly2se+TzNvkMODmr1qegB5R9M7EMOSzZIqvvoOonVLK1tHKnzWjZwpP5sYJH2FbplXhqGifSr4w6pElzD+H5YMvl8Yb2H2r1i1EUsKPEmRt4Y9SKD0rwfp2nPHclWnuFXa3mflz7gU9SKOLKoNmB7Yq2OLS2PHSSF94xEghYKQ2McZraxlgBsB+3ahdRCA+Y0jJjpRybUCiIZUrk80XXscxwF9AxurbIPeuUC4GBjP9akUc+o/pUuKY6dG0QPwpIqVIYklMgT8QjBPc1tNq5PQ+1dlBIB0Hz0qqhQjkcAykBnTaf4d2a1ISUCSdSOgNdyuLdBjr7Ujvr9hl13bV6t7VnUTdkt9bLPCYriNSrcDHagjfWtrCYJLgQSflUZyTilGoa8yYbLZHFBJqKaiECrZvMWICXHUfINSlP0kdEMV9lwtrZrm3Um4cBgQwwOQayw0W001XW1EhYnI3uTUmmzw/TKI3UhVAbbyM1DqmtQacN1w0m1CCxjUn7U30STYv8A7JNwQfgodrcHHSoJMMMkcVFDqtveAfTzI8jJuEe7DfqOtJdUtb7U7ZZjIbO7hYlDE5KkUZZF6NHC7+2iDxi0aWwiTLEg5w3Y14jbKYrmWHONjspB+9ewXkxks8XmHuFX1le9eSXKuddvBjkPmrYnaJyVaJZly/FZWnAUglskisroTJNEt6TLJ5USlUU7E5yXxVz0nybm3ghurotHD6MMeuOtVu0Mt9eXF6YT+LIShRDtUHrgURHmUSrInlqBiNehVff9aDSoFuyytf2axyRWZDSchsc8falH01zqcpe9DxRhfQg4L0PaW8OkSC4fcGK7mO7ovYUxh8V2rTrPKgGU2x57H3NSa/CiddhVtFo9nbqb4BFU4aPGJM0HqmryypLb6JiC3b8wjXBb7mj9O0p9UkS/u1Hk9cMeZBXWo2trJfusWXEajMCjZGv3agrGdWVVNPsfIT66SSeZjuMK/wBzW4ZrwP5VlGthaLwzrxu/XvREvnS3EktrthRfSSIsjHx70M9tfTIWM7uiHA3R01goKt5bcBWuby8eNW9bKCAQO2fmjtP2XVlcQIGCtmSIN12mlqCaIhJbueXBH4cUYO09s1No0txaSl744fzDjP8ADnGP0/tQatFMbqQuuI+Mnr0P6V6L/hHefg3Nsx4jYOi+2etVDWLTyLlwo9Eg3KfvRXga+/Z3iOIM2I5vw2PYZ6f1oR2qNljTPc4zxmluraSmoxnzZJQD0CnFG28m5e5OKnkk2RFxjgZye1CSTWyCcov6i2ysxaRCKIIkQx6QOvvUd1ays7brhhEVwYsDj5Bqa51G3S0NyzhYVGS+Kht79L60SW2TzEccPnAFQfDpFo8/8mgbStX066uJNPiuPMliXO1uuOnXvRLXkEbMqkkocbz0rIbG3SUypbxiZur7eaHntfqIJoUPkFurbAf5UfukG8cpe6K6/iHU7jUJYtOso3jRx+K5/DjA6nPvinXhc3lxbGW/kRyTkeXGUHPbH86K0uye0sTC4W5kIZj6Qob/AMGP5UyhAVQCoRjywHTNLCD5JsrmywpxhEyTEchABPHFSQzc4P8ApWSYC4Zc8ZB+aHyXwV4A/qavfFnHVoMkQPncAT2zQ0zBB5fVl7CpEmV0PQsPnpXOEZvQrNn8xrWgUzTlfUSy528lu1ArAJVMaltvvnvRsqhTl+h4x71uMxiHjAB4De9D2HpWVnWrDcCkUgWbaNrO3p3D90nt9/iqo6zeZIrkJtznIGMCvQJ2QROqeU0gPO79+l9xpUNok17OqRAD0qB+UdyfioThbtEs2K1aKCtxLbuSJVkgP7pOAPt7Ux03VVivVkd5No4OTwFx1plJZ28+S8MMiSqDvC8MKV3ehz28xk0mzWRV/wAwSerafjJ5FcssMb5EIufUWXGC+tJbZ7lWIQA/iycZ+3xXnepSxzC5lV1ZpQd3PT2ou8fU9RtTbxW7rkYdj3x0AHQChL3T5bW2jgNnLCWjHmSF9yu2evxVJT5dBniklbF+n2+o3VstrBHG8Tt6WamEPhCCME6i2XLcKjemmmiPa2ckEc7FQV5wM4+DRuq3llO0lujxkoMADoeOtMp/0WEnHpFI1zw4E3tYeY3C4RF+eoPTpXWoSSadbLZWbh7Pau4SIPwzkZyffNP7VLQGSW+mn3hwNludqtx3qq+IZNMmvI4NItJfqWmAYtKWBP8ADjoc8c1VLkuxZfZ2Lzdxy3hG0ExHLHPD47D+YpldO7avMGgeVeOUyCBgd/8AzpRg8PWPhzTZ7/VZvqrwsoWJT+GjEj/5EcfyoddTeLUZkClhFLg+xyAc0koLloydLQvvtYjtUaBLNQ/bvj2OfeoWupL9nmtY3EiyKqnpzin15o9prBWUkLN3IGN49jQz2cel3EcUsP4BGUyDjcev3pk4Ja7DdgTXMMERF1ITOTkhRkA0vlvoDL6ndlJG4f2qXW7U3F6v0keECDdz3rdhoVzcS4htJLhhyQgzitFRW7Hjjb3QTZXEEs2/cVZfyg85q1+GFmFzJIWdQeCuOGP/AGpfD4O1u3mUDSZGZ1wAQCB/Wn2neHNZhZEEEiDdguzDAqWS/SK4cdS5MscSiSVVjOSqknAp7oljJbyyTyADzF9PAzio9C06Owi/HdDKP/DRkFyJpGUNlVYrVMWOts6pyvoND5BGOD0xUchC52nAAyd1Sc7BgYxQV0+3Ibbu9m/1rocqROMQS9cN6YuZH4AzW5blbdFjXLNjDAc4oMRMbkZzuPII6Gj/AKVI1DPgM3b2qPKy2kdRAgYA9J5yaLjQqwAGcDOc1UNW8Sra6ytgrN5ZAHmRjJQ+3zRkd+yz/gSk49TE0scquh5fHlFX+lm4fH+vtXRYbeOAPelVprEVxtDnbk4OK7ubsK7qQSO1dF+zn4vo6vJxgEdQee9V3UDJLNIMMIuoC9CfmmiTERM20hs9PilzGSZ1UqxRZCeO9Kx1orlzpd9c+tEBwcBD1weOKXahoOo2o82O2MkgI2yYxwOxr0K0sZCj7zJG+dxK8E/FGCzSQs8xcvKBlWbhftUZQbejpxZ1Dcjyi28Xa9ps7RPbI47I0fIPvxTVvGb3XlG50xydnIjY8c9SK9CbTrfzA/lKGA6gDJrkabZ+Y0qwRgkYJCgHFM4Nqi3/AJWLuhPYwRFm1C0tERmTPnFuW+KMtkdonluGaPzFwY8Z5+KNeNCcYx7Y6D9K6OOgAwfeioVVnHPK5WVTWkhjtnzCpfHDe1eQ3ETfte6kBIyRj5r2vxBEPJLjAVR0968q8QGBLhVhiCHb6iPer4lQjYs8kzybIhkgZNapnpUKQwtPKwUyNhdxxxW6LyUy8fjuSsaxw/ReHDqA8+W5uZGhgghP8I54+O9JdDnvGDy38bSEuB6+rP8Aur9hRtheXttpKafCPMuXdxG/TyQxzIf6dfiofO+mslkhJdnHlWq4y0hJ9Uh/tVV2cXojkE+rao8B/wD1YP8AMb+M964W0W8uZZYkxbWo9OB+Y0bHBJbW6WFvzczjdNJnkZ60SbgW8HleWBDC4WOMcmWT5rdBuwrQ5755wLyYRJGm8oRxt7ZHaj7PUo7uKYrE8h3HawT0sf8Aaqp4mvo9MtWt1cvczndM2epPRfgCteCorrVLZof2okMMJx5Sf5jZ9iaVxtWFSp0Mbm/UySpPPMuXwtvDjP8AOsgjm8p/IYRcgZlcnj7e9GnSraOSS3a0YJ03RvyT7k0+Fvp5ihePEKQxqrlR0/n3qVoqUh5BGJJG1BGZHyyjPrrDa3cto813ciOIOTEr+newPGB1P3q2Awp5cdvHA8kjAHzFAcH23cVFeWqHzPKhWIRPtbz4PM3n2DdRz3oqRqoX2Mn7V0zyv+fD0HuP/P8ASlFwjwuHX0lW69waZanEdD1SOeKVGjuCW2IP8vpjP+lT38KXMIvIF9LDEigdD70Wq2WX3jXs9R8JauuqaVBNvyzLiT4YU+liWeAI/SvG/AuqtpWsLayvi2uTjJPAbsa9ihmG3P8AKjo5JaZ3NaRyQCExKYwPy44+KgWBYY1jjQIF7LwKMxvwzHODxjpUci7cnHWhKC7QE31YOoAIxUM3mHIi2j33DNEkbeCDUY688Y+aRrQ0XTsGtI5yubsRiXdn8IkAgdKYB+Dkc46ihXcq27ClR2pbB4htLm7e0tt0t0pG6MD8me5+Pel5KPY/CWTaHLg7MN37E9a58pSmwkBehGetR29yLmFgu4SIWRt64wR7e4ruGB44sySGR+pZqZ7YlNA9jpkFkZPIBXccsc9aLWTymC7s57+1akYR4aQgA9CTgVE5yOvOea0XxVIEk27Z0ds+5VY5+1dpAowMcZ5WuBw2wtjPNdSyjpj8vQk0bRmn0DssQlby0VmVvbpXN+ouLeRHHDjGDU23q23jPUVIRvCtgcdBSVYbEUWlOi+XAV2rwileAKntLF7beryqwbkjGMGmJLIce1RxxnIP5xnNLxV6AopbBRpVuMMk23PJA6ULJaW8+6CYow9h3p2FVzlVz7AChTapK7GU7TjqMZFZwTD32Io9As4rkSwIySLyrb6hm8M2kwkaWNfNk7p1NO5d8DrHkn3JxyKFlvNsx8wusZOBleB+tRcYx0xZKlcUVHxBpb+H9NH7OEk8UzMGQJvINUSzsZBK8pQxtj8558snuB717Bqt8sMMiROomXAK7sBc9zSCz0xr5dsZ3qWKvK2Mbu5xQllinxj2cvGUn0Unxhc/UQ2trE3pjHmMAOM9AP6Ut0Wc22rRy6hC8kEwCSvGpbb19X6Z/lXsel+BtMs5Xu7mH6m5bndMfSPbA6U2h0+0t+RAgmf0lo1AwKuk0ikcGinxaPGhjlt3V4ZMPHKp4K9sGi7nSBPCUlVW46Hk/erVb6LYwQuYYtm8ndtc4z3IHQUDe+GIbmdZfq7uORQRvjkxj+VLKD/BPC7KzZ+H9PMu+YR26t2fkYzz9qvlhZWtqNtnDHCjAcovUe9AQeHYANkl1czMeC8jAnH2ximcNuLOHy42kZQMeo5NHFBxW0dEXKqkQXl/5YfyAWcHGe2aSpPdQySNtLOT2NPnkt4Ix6Rz1AFBNcQlhthznjmg+Nl46XRFYxXEsommxuPOwdMU0hyXJZFRc9hUUbEbFRRuxnFSKZmVvNYIvYe9OmhXbJ5TgKF5HU+9B3cUjzLIqHA6H3qWLCKXZycDp70Jc3txkqsZUj2PWtN2CKJbiRLaLMnqcdcdBSS6vIlVg0kpOMIWPJqe7uZDauBlC/XAzSlRDK2x7gtJtyyY6VKX70XxxFYxe38sbkox9aNim37KaKJXaZy5457iooNU06O+SAF4rhThRs5PxR19qsEF5FayukbkZVieP696WCitlsnklSo3ZWu2QFw2E9+/2pniIjLjcw6A0utrh5ZfwHSRxxgODijre3kw3mOpLdTnpV00zlkmnsh8+RyViUDIIyR0onT7F4wWnYNu54GMUWlvHHEoUcg1ISFHq/TmjQvI5SPYMA7j8musqh55bHWo5HOAY+uenxWgwP6daYH9F97c30LhbS384Mcly+3bRodvKUn94c1pCOpUEe5oe8mMS7jwp4HxSpUxm00dTyiLvxig5b0KmdwAFB3czzqNuRkeqkeragtujQuRkCiaifUtWtpPRNJhPfPSqFq5g1DWFWzYOv77r0pPrOoT31w0ELEJn1EdviiyRpdjsBH1Lrj/ANtUS4oaC5P+A+uXUbOlum3yo+xPfpWUqKvNK2E3HqQf9aynWJVsEs8m9MuMdhK+nC7uAILeTCtIx/yovYe7N/c81DYIJhJrN1EEiXEVpAOPgDFQX6arqs8Fnc3GY4181odm1LcknAz3wDj7/HNHRvb3ciW1sWNpZodzg5X5I+c8D9adMjRJaAyiSYHfczgjzMY2qOpHtWQtG+byHb5EGY7ffwGfu1dXMj7hbBlWe6O1Qq58qIdcmkHi7V4o1/Z1iQIYhsJXjj270GgIrOq3Jubt5CzOWJJZjyx96snhLSHgsjqsisssjbLMe57t9hSPw9pZ1fU0gdsRLl5m9kH+9eo6eI5JTcJEIobdfKtF6BV96GSVKhscbdkOmX9xbzvDeRtLk7t68nGOpxwOfmur29YO5t5sCRR6SM4OeOaVWN19X4mmuEi82GJSh3YKtz39/eh9Y8RzLq3lBUFvDuGIl2+ojjFScbRW6Yytrm2a2aAvHJMT696gsfvkZ/8AutveuZwbi5ngQnLSRvuUcd19qp02uu7kOpyCTy//AGqS31/yATNiVPcAj9PmiosDkWe9tk1HEiXdnPO6iNEJKuwHfnihNMvLjSLySw1BSpHVSwIIPcGkz3Vjc5kgbyWY+rzD6Vz7e1cT2ku+IIfNcjny5VbaPjviivxmUmnaLfqFiqoJYCTA/KsP3au/gzxN9TEtne5+riGM/wDqr/FXm+ga01t/wl6Q0RO1sj8vyPimt7ZSWkkV3ZTEKOUkU8ofb7Gg1WisoqatHt0UwZQDgA8ipHGVHOB2XFUvwr4iS/gEc2EukH4kec5/6h7irfBOjkHOT7UU/TOSSpmpF9IGMHufehsKnpLEn5o+XMi53AdumaGljz/mY5HellEMXfYLLhQTtMgHVBjn+dRWtha295LLHAA8ozIwjwSfv/apb1WVXEeWQr0x6s/eqVr9jqt/bRXElxLp6RqQySTFth6b/T14/rXNOVHXhx+Rd0XwuOu0sM9jwP8AtXa/iZXqM4IqmXfiGOzaDTvO8+Q7Y2mcZjJHYkcknI9x81abG1kWCFrwpI6/+mMKvwKeGXlKl0Jl+O8cU5e+ia4iWRAkqIY1OdpGcEdDWyg28rkEcVISrF8A/pUUzztEwiUGQDCg9CfmqNe0Ru9A8nmIJJPKRmB9BxtIX2JqkDxfef8A5F9AIklgfARN4DA/HvxV3iMsUCreiDz+rLEDj+veop9PtmmS4aKJ5icq7RjdGPYHFRlFvdnThy44Wpxs7jlBTzXKlG4WpUm2kdue1RTSw27RwmGQtKSMxpwp+cVwkdxHcMJGj8ggFfUS4Pfj2o/ZaRKlLfQTMXkYEYVc9K2PSOBx3OayTqoUFq5BH7wwvfPSm6ESvokLbf8AJOOOeajdNhVuMn3qMujv5e5Ceu0NjFS49QHBOKykmGqOWhVW8xRj57UPLaQTR4Cq3OS2T/pRszlV9BGcck9KH8xU2qpZ8nOduBWkovsysBh0q1uVzNbR+ZnkqMZFZ5FpbYgXfE2C6jOMj70waIs6SZww/Ko96ilsYrmbfcM8hXsTipPE1pDpq7Nwzqyj8RCM4ANaab/iSseOnPHWpfKji/DijBkADcDt967Dq7bcgPgjjr/3p91TEb3oj3MuApGTxjpiuQ4jkZ5Bkt2Ddf0oa+S9ZFWISBXcB3jlCsF9+hqp+Mdbk0xoba3STe53JOQG2+45/wBalKTidOHB5XxReYpA2GKMrHnGa6uneTITKnGOaUeGLqS40mGS6EhkxyzjnP6UzdlicJEjFWPLZJ/lVoybiiE4KE2vwhFnJKg8wEheM4qZore0jXKoX9zU8ZdwUG4HOcGh54lKncGYj56VpKlaAnumdW93zyhx3IHNQTTGV1QMykfrXVurQRheSg6O5yTXGGcko+Ac5AHWlTdBpWSSSRCICN/UDls+9L7q5lVlJRsNR5BWPAwOMY44oBlEgZPKcsD+ZjjNLOT9DQS9g87TRKSQ20dAvU1WdWeQvM4icRjGTGQGf3BFWxLFmnEsgwyAgAA4x811JpkT3AnlVS/TbkBT981zzhkyOzqw5ceJ7Vnjl7ezfV74RcW8S5ZVfJx8Z6GhrrXbrVNkbkYiX91RnPvgc17ZeaBY3EDW8lqnlsd2MehT8VmmeHNK0tvMtbWLf2coCV+1dMVS6Ky+ZF7VlF8DeG9Ue6+pulkgsimMyNtaQ+47ivSIYLeOJY1RWVT3559/vU/pb2PfI7VCScjcMf3qijRw5c7yskdyx4wF96hdApAPqcjjmt7sgg8EHpXDkyYbO3Hc0SRo7YwAWJxWStvGI/SailfdnaAcf1NcM3oy3Y0UY6luVjTaeo4OaUX0rygIT8jJrd5dxxzbwQB3qv6zrsaD1Nzjj7Vr9BoI1rUhb2iKrjJGDg9K8217WJJ5DDCxdj+Y/wANa1bWJbyZo7Tlu+OQKjtbVNOTzrn13LdAe33qijx7Ck569Hen26afEJrkbpsZVW7fJpXfXLzSk7iSfeu769aV+Msx6D+5qOwGZl/5kpzgMvA+apFbtmnkVcYdGrZRycFxjqeAayp4pwZpCMXHv5YO0fIrKchQ7vob+60uNIZAqXMhLKqHzXJORk/wgf7U4srBbC3isBKAzr5kuwYwq/2H+tagSWfWLq5u38r6V/KKFwyx4PC8cZJ5P6DtSe/1kKtym1jJN6AedwjHYfJP9K3QFsh1bXHtRLOSFuboFYcD/Ig6A4/iaqZLJvxhdvZQOaIv55Lm4ea4OWPBx0XHAUfGKaeDtPS71Brudd1vaL5hU/vN+6P51ulYNt0ix6Tpp02whsYl/wCKutr3Eg/Nz0UfAFNfEV39DZCG2IB27EWutNDebPeXOST0+/elS7tX1rcwU29uenYt2rn/AMnZ0JcVQ0trnTNI0XzZUuLe5wGInBZZWP8ACQMfocUrNpEdOmv5wrSzEiJf4sHr/wCe1ML8jUJ4rIsEgX1Sr/EB/vmuJtk+opbAAWdmnqx0GBn/AG/rTJAZU30K62IWUgy+o84wpOBz81ZNJ/w9jvIwl1dfThRkyBQP05PIo+Nkmd9QuZCUjOBFs3ck4UAdMDj+tWfUWi0uxh/at1bwSbdrRPNlgc46L/51prYuiktoPh7Tj5bXOoanMpztt1SKMD/qbk0BeXWj59WjIh5Cg3pbdjuRgHNWuD6TUIti6elyfMB3uG28c9TjiuDa2CSySppVmJixBOCcZ/Wkv9Gr8KS720ciMtou3uu4lT8Y/vTPQfEUmmsbWcGW1PVPap9VjtGiVmURhsggPt3DPtjpVavZLONQIfQB/COQfenu0BSaZ6I1uMJqOjTNheV28sh/2q5+GPEcd8gjuCsd0o9SZ6n3Hx8dq8a0fVWtIlubOfbOmRLCW9Mq/wAQ+firVp9/Y6uFltZha3qnOw8HPuKDVFbjkR7XbXKgjnI+KnlQEEoASa820jxHJbyJb6r+G+eJSfS339jVx03UWmaRn4BICge3vQUvRzyxOIymjCqfVzjt1NBPAsg2OpKkZwaYqsUpzkA/euTCMMy5yOAKDhZozcXorV/4U0u9kieWIiSM53IcZ5zzT6FQibFyMDAGc1mCCBjBPWsb0jn+VIoqLHnlnJJN9HSjaQcdfaobqb6eNywboT6epFSKTu9h7iuZVMhAfOOgWs+tAVXsXWGpWty4QKEl2Bgr4zg0WJE3YiJLDO5jz+lV7VbzT9LuJWktrjC+l3Q8D2/8FMtO8meH6m0BVZsMzMSWaoQm7o6cmOo8l0MVlI3AAhcYDZ6+9YVjjiErvgY5+f0qPEzvuO1QOMAVhhDnDtzjoascyZHPcJ9M8sRCsBkbqpN/ceINbsJ0SFoWD4DQAguPY1bdZvoNPtB5kDzg4/DjTJP2pdqniIW+iG90yESpJhQjKfSflfaubLHm6ujv+K5QVqCd/pD4Ilnmt5ba7t3imtzty42k/c0+FwIXeKRZCexXniqp4e8WajdSrHe6adrHAkgTA+/NW9EHmbwgBYc0+JLjSE+WpRyXNf8ARkEuVLNEQMcbziutzSSKmCFxn4qV9qLjAIPU4oZ1/GWZWdSoxhWwp/SqvRyxphKusa+bI6oQOtBz6tZwM0kkqrx1bgVBte/m2TxlUHKkN1qDX/Ddnq9tsfdEfdW4z8ilc5tXErCGNSqYZZX9td70t5kmlPDgNyn6e1HxxASFixBP7w44+KVaNothokAS2ULjG526sfk0RqyyXEIitZ2hmBwJV5K5xn9KKbUbYsox51Hr+kzQIzOH3ls8Enk0jvPC9rd3sd5dL5koG0qenft7VDNrOp22px2X0bXQBGZNu1SO/wCtGal4j/Zd0gmtZ5I5uFdMHafYipcoS7Lxx5cb+r7DNK8ne9rFbyxCHCjIO0j4NGyHGFZsA5Awelc2jvtU4OGGcZ6Z+KkK7QuTx3zVYr60c02+VmraMpGNrvJg87znNZMS3+XgZPqFdgnBwBz3rneqcgZp9UIQeUzj1tx2GcVKqdsdPatktJg8ADpxUM0pUHbgv2yaRpIbb0SSLhTgZxwfag445t64VFTndu6k9sUr1HUdTtIzugTzdw27FLgiutIvrm/01X1CE21yxO5RwODxUnOMn0X8LirGt1cRpG6x+XJPsJWPcCSftmkmh3+qTXNxFq9uFTIKHYNooe48KRT6jHeF5FdTxsY59+tWWGIRR7ACR3BNZJyd9DycMcKW7/8AgSHDDIGR96ge3he5WcoDInCtz/vXYJ5wMCuSMZwTkVd7OVaNzMDnYuGrheVyxwB1NRrGWbcSfnmobuWKNQoYMSentWAd+YPW5OE7GukTdgZ68g0BcNuwPMznotDalrcGmxBM7psbeK1oahjcEwI0jsiqvz1pBf61DHasuSWJ4qs6rrbSYLSHbnkk/wBqq2seIC7iOIljjAUdaCTZqSHes68q7izAAdeaqktxdatIY4yyw9yeDXAs5JmE+pSbVx6Y+pP6V3dXqRx+WAIo+yjkn9atGNaQ7XuRJF9Pp0bLbeqQdZM9PtSq5u3ndtmSffFQTXLz+lRx7CpIY4zA7tJErdtwJ/kPf5qsYpLfZKeVvS6NLbsIfNCsVJ5c0ad31UckwkywwA35T9gKi2qYoWcIO4LNucj4+KklCRzwzlY4wTkfibmPyR+6PasTR3HlZnznGOAo8rH6VuoJklSUuVl2N0aR9zH/ALVlExb77bHbJptqoMjH8RgvA/iY/c8c1UNTElozxykG8l5kc/8AKT2HsatN83063d3Kxb6fmUg4JkJ9I/Tn+dUG4uZLm4klclmlYuR/FSx2wyqKo4KPcTRwW0ZYsQqr3Neh22mfsfTotPG1rhyHkbP754H3xW/Bmh21lbC7u4s3YO4sRkqD2xTk7ZdRLL5bYJbI5K9hSzd6QcarbBNYc2em7C3rPoAoSyhXTLNVZR5xzuGepPf+1Taovn6jbW7f5aZkI78dq5vH+ov4bZPzH82OwoJaGb2djFrZy3cjDe5DDHTH/wB0CsbxQRxIHM13h5AOu09B/f8AQ0Tev597FZDHlxndJjpgf/Vcm6jE1xeuB9PbjKAHvjCj9BRMdyjVgg0zSpvInCB7iTBPqJwFB6Z6f1pe2lx6reLamWSd4/XPct+Z275P9APmiY5HsNJmu5XYTTEN1P5j0/kP9TR+hRE2SG4BimmbfPtyGPtz8jJrAItPtpbaMqkjyrIA5QsenUdenGKkmi+kRpHZ3LL6gZBxznGDUthdedczzLBudCPxmOAC2fSo7tjbzVdudWlu9cjs4woiifaQrACQjrz96WrDdBd5dxXEjStpaylIz+LM+AQP+kUpuYnkgLQ6aI2kOWYoTjjtmrZNp0MTGe7HmkPlVQkgfy70v1e+vp5TDCCqAYy3U/asnRmrKgLS5CGYEoh5G5duT/Y1tbgxSB9+2TH51/7UXf6dcu4824Z17rzx/YGk91B9PIQqEHPDZzVOye0y4aV4w3BYNVh+oixjevDL/vVw0fUZYY1l0m4F1bHrbu3qX7dxXjIlbccqy/IFHWOpT2cwlhkKN7jofvQcbLRyLpn0JpXiNLtfLLlZAfVE4wyj+9WG21IOu1W3YPXNeG6b4qguSqarGN3RZUOP61cNL1iaHb5cq3UXYE4cf70lNGljT3E9FNystyEXliOcdqlKkqR0x1xVWtPEFrkES+XKeCjjaRTmz1AyYCMMH+tL/slJV2MI4vxCPb3riTlixyAOKkjlVQzEDk9B713sUoA2ASc01a0AAms7a7AW4iDgHI3cgGuolWJCkaAKOgA4FFiIHkN16VEVxkY5qbiPybVNnCOcfPyK5ZUD5bjHJY9q7GFBGP50Bq1jcahbNAt09uD1ZAMms+gR7BL7ULeGaODzgu5+WJHT4o02trNEiFQw6kAYxSGy8EWEFwk001xcSKcgyPx/KrQkYjUKucY96mo02WeRJJRB4LW1QgiBQqDagHYV1CViV22nav5QKn2jPAwKwplQO3enUa6JuTfbBPPMq48tv1NRzQSzIUV2QEdR2pgEAHTitnA6Dj3rOKfZlJp6FujadJp1uyTXDTksSrN2HtRM5OwAHZz3ojdwelcMm5fVgkUvBJUhufJ2ym6/ZMbaU2okuEkOZYEm9QHxTHwze2iwR28spSdUG5JT6l64zTmO3gSQ+XCm8jlscmpRYwkiVkG8cHA7VGOBxdo6ZfIjLHwkcuYlDySNhV9Tfeqjr/iJLWS3ngtleNZQsjSKQQCewP8ArV1kkt4tzSMvPvSO9t7PWJQssSSKjdfennFyehMWSMLsbW84mgWWM+lhkVIxyOuaCvHmsbJPo7UTYIG3ftwPepY7hJMYznHOapaWiDV/ZdE+Ts2itbPSB3Fa3gHBrtSCwHAzTCmJkdetR+Wrk7hkDtU3B56D570HeXK2xJLj7ZrMyslUIFO77VwGjZ8ED44oD65ZGwCDntUi3SqckD9aWkNbDDIAcJzWNOueMA9KVG+wCcYFD3moxrGDnaQc5HetdBr9HE12kI2ucHrQUupxn9/bSO51dZG8x3HPHNAXGpQeUWLggda3ZqLH+1EZWVWoSXV7OJdsrDPsao97q67W8uTaPcUhvdXMr/naRumFGTRUWHR6JrHiC2t0ja1lVjg5HtVL1PWY3DPK5yfc96Su1xLy7iBcdScn+VQb7eD1RDfJj/Mk5P6e1OofoWv0kuWuLw79308J/ef8x+wqJBbWQJhX195X5NB3N+C2d5Z6Bd5Z3CjPJ6CqqInOK6DLi/yxKHc38XWgj5kmXbcftzU1vbKzMHDkgdE5IqaOXybYqrPGx6hFBJ+57U6SRNysy2hY25KSSRuV5VFyT9z2qWHyobHcZ2jcjAiQepz85qLfJ9JsMxi77FBJb9altkiitWVpDE7Kc+nezf7URTvOyzykixZ5I25dx7Z7CsmkRFQq0aAkY7yfc/FZJP5cCxoSpIwwC5b7Z6Co3VWQRxhztwAm383vlqVhRxeMrEHywpJzjcSf5dqyi7iAfla4Usp5TOCPnNZQMSeK9Q2QppkPaRpJ2B5kf3NLfDVoLnVEkkXdFCN5H26fzNLLmZ55XkZstIxYnvXoHg3SfKtFjlBWWT8ScHqB+6v9/wBaPSAvsyzWTG3sy8hG6X1k+3/n96FsBGsE1435Wxg9MKP964nm+tuTbqw2AfiY6Knt9zUOoSm7K2FudgPqkI6Ig+aSihHZSGSO71N1x5rYTP7qDv8ArUGnERRT6jOBmQEKD/D70ZqVjJc2EKWjKsIk8qUbvygDI/nQN2Eur1bGJttvBgyt2HsKICKNzHbySupNxdHAz2B6Affj+tcvGDe2+nqd8cTB5zngsf3f6E/zqXVb6307U3iMMhMCERj/AKscE+3xQySNpemyXLndeXTc4OT7Efz4/nRowSYm1LXooBt+ltcNICeGOeh+5/vTK/vBa6dK0a/8RdYjgPVmB4z+gOf/AOqH0uyks7NY3TdcTA+aQehI9+wxxUVpOuoau950t4PRbDHGff8A89hQDZJcyppmjrgFpFL7cfvSHq39aEtLWHT9Oe/niDOUG0Fed5PpUf6mpp0F3ffSZJigwu3djfIegP8AIk/apwwvr14wg8q0OUycjf7n9AaBia4+oeC2e5lVWl/dzt2jHShZJIbcGM/iuD1xuKiojt1e+mlklHkWY8qJRxknvXGjR26NdLJGu9Mk3Ehzu/6R70HEykcXVzGpKFi4I9WT0PzSm6WOUgopCjqSDz+vaml1b20z7S/LYI2sOtavLSDyFj3FEHBw/U1kFlNuUVpm2TcZ4BqBlCElJCT39qsE2nWpJ3MwAH7hAJoObS4H9MUjE4yQTzj/AHqiaJtMVi4MZwrYJ7UzstYntgNrHb7dqAlsVjPGT25NceU8eAMD7VqTMpNFxtfGEhCrPGs0X8LHkfrVo0nxTCmPpbloW/glGRXkmfV9u4qVLiReQ2fvQcCqy/p9AWniwvg3SMf+uJsinNt4gsZnXFwSR0D8HNfOVrrdzbH8N3Q9wDxTuz8VzYAmVJT7ngipuD9DfSX8Pfv2yst2scRXag6g9KLjvonlODkt/SvD7HxXBC+VkkgY9TnIp7aeLGPMV1FID78Gkpo3iT6PV2uICjOrAnoo961G+Y2L4yeg9q88t/EvljdJEcgekqciiYfE4ZRH5m0sec0OTTFeJl5LLGyKzAsa2SQSSpwelVhtR3BZFuIy5ICqWox9ZWPETkPJjBIPFaxeLQ7c84XsK3Ew3Z6gUkbVDIwHmqML0BrtdYgigOG5b2rJm4jOVmdgobaPasJ2+kNx3pTDqCM285NcnUoyxJYj2pbDxY4eRRjaK6Vlz6zgd6Uw6ghB54xXA1BCcM+Fx1zWsPEcx7WXev5QetC3V1IWKIwHzSyfUikO2KXAJoe9vGkcbMHavJFDlZuIXcRK0eH9THqc11YW0dqp2nk0ogvj69rBsCp4tR49RGR1oqkF2WF1LRgkgKaGJRGIyOPak1xq6bAiv/Wl7apFFL6puvuaLaYFF1RakdcM2a5nuhHtyRj4qsSa7AIsCVcn5pZca8o/5mQKW2FRLNqOoyxRNsIIUekA1WX1aW4OJgQ3vS6410MMDnPvS251ePBBIzjsaPFt2Mmki422owxBWB9WOc1y+rBm/P6RVAOryc+WrN+lQNf3THJQoPdmpuBi83GsL0MgwD2pVqOtrjCkHvyaqjSyty9zweyVDJLAnLZkPuxoqBq/RlPrLM2AWb4XmhWnvHyciJW7uf7UC+oYGEAA9gMCgZtQP8ePtVFAXlBdjZ2hA/GkeQ+35RULaiI1IgRUX4GP60ma7kf8q5PuajYyOcM+Sewp1GhXk/A6W/y3LZz0xQpeSQ4ZiB7VixOrKm3G7n5NTJGPrQgjDgJnajdfue1MI5WRRQb5PL2lpAM7QetTRx7WlDK/t5aHkfc+1ahUnztiEknAjjbr+tTCHEDbwyENjCHmsKagQRoWYOyk/kizk/f4rcTqYWVvMRcktHGvJrUDLGjN5xh544yT+ldLLttiS7RM+ckDLP8Ab4rGM86QWwIbYr8GNVy2Peu59qhIvOGFwRGo9X6moo5JUtOWCRNwwxyaK8ktAGWaGGNeWL/mY1jI1Ko2oGuQwyAYQOR8mpLmaRXjgnkVU3ZRIxkj71w85+nTYsUaEjMpxuc1uaMpLG7JHGrH87H1SfOPagwkkk0vlk7UWDeQuACc/JrVQzQybEjG2CJcmME53DuaygYg8LaS+p34l2ZihYE56M3UD9OSf+9Xya4MJjht0AaTnaP3zjq3x1riG3g0XSUtowvTMz92PXn7nFcW2LeN766GJXG8h/3I/wDemYFoIuZk0u1ESfi3M5/m3/aozjTtPMkrbpnJLnHJbsPtQFpLvlN/NGWZ+II8/lUd6jt5G1C/M8zEwwEkLngt2oUMd3v1VrpEifU7ZbmRZJFI5HcAfNRFX8iOxjx505DSuTyM/wBu9TPMJpmuJvWIztTefS3ucd6K0uWGzjuNVvUMrbGeNAO3Qcd8n/SsYCOmP9YbhYJPpVbImnP+aw7rnkgdRWWSjU9X+r2EWdocKAOrAf17H5oJ7jUtRvd07sJrnCQxEnManrn247U3c2+l6YfLACQyNg9Mt8fr/pQ/gTerX1y8EdpBxc3ChThcdRyT7cCuGZdN0ssr5ECfhenksehPzyD+uKH0rzZHmuro/jzAYUfuru4H69/jNERsuqamdyFrW2YMTjCySHnn4xlsfYUDGK30Wlg7s3LHgA+rzGHT7gYrUhNpYx2iOPqLyXDuOucckfbgfzrLK5NzeT3k5P08OVR2Xg9SzD+vPtio7AteXL6m6MqgFIlPRV9x81vZg65spNL0+zhCbTc/5bA8njkmkmpXwitLyfYqpEPp7ZV6Z/eb7mjNb1ifXZIXtSbaC2QWsbPzuPRmFRwQ6Tc24QkTtDuVIc7ljwcF2+/aj0DsCsrOSaC2hQtE8i/hb1y/I/1qe/8ADrRPuJkl2KFPrAC+5Jrf7Se3uP2rAg85W8u3JXgH3Arep6pcqtvYsf8Ai5RmdmQdT9qDv0akJr1Etm/BjJZuPMbIyfgHmlct06KyiUlmPVRgirXbeHluHZjdOCQQSepx1+aKXwxp0ESusEbykbh5smT98dKyaRtso31DShggdue+TxWCOZgGkGwEfvHGasOoWbRS4+tAGPSkUfK/fFAx6a5JEyuIwcl5SF3H4HJp1JCuLEjIqDJckZwBjFaU5wNh++aZXKwQuQCnTOFzx/M0EWVk3Rwsxz1I4ogaItxXI5OK3uGOeK3Gj8l1Kg/FaaP/AL47VqBbOlYgel/61Ktw6jBz17UOwAwDz81zu9iaXiNyGcOrXMP+XM6/G6j4PEd6i+tkk/8AcKrwfBwwFbLqDgg1uKHjlkui3ReKGPEsGOP3GoyHxZAP+ZMn35qjbkIGCePeuwxz1zSvHEfzSR6FF4kt3B23gGffg0db68gTCyxt7HdXl+5jnmtFiKTxRN5v1HrQ192xtdQB7Gty63K+3YQoA/nXkwnlX8rkfrUiX1yp4mf9GreFBWSHtHqltrdwgbf6x25rX7ZmY7Qv35rzEareKOJpP510NYvu0rUPCHyY/wCnp99rUjFFiGVC/ahTrl4EIXIzwea88/bV93lP6itDV7z/ANU5+BW8LNzx/wBL3+1bxRiMH55rj9p3/OB177qpH7XvP/Vbn4rR1S7P/NfFHxP2bnjLg97els7lB+9Qyzzu3rmUfFVI39wTnzHrk3kp4Lv/APKt4kbyR/C0mRs5Nwf0qJ5oh+e4cn5aqz57fxD9WNcGdzjJAorGgeRekWZrq2BwpDEfxGoG1NAdoQfyqv8AmNk+pj8AVySzMQCftTqKB5X+DyTUz0U9e2aGl1AjI3L+lKscHd17c1sDJAKEZ+KPEDyNhb37EcEmomuZD0H86jTawI37cdiK7iUPGWJVeOM9T9qNCOVkeWY8v/Wu/LCjJwCexPJruRFWBMuv8uTXcyFAjbY1U4wxPrP6VqFbODCyAFvSpPOTzj7VLL6HRfLKcZUkcuKjuG2lH8hl5z5jclqltT5jGfOxh+ZuuKwEdCMeeAYSrFc+UGyW/wBq6twkZkS4jKKVzt+K3EMTEwlgMbmkkABP/auldDKJIt8hP7zcjP8AtWsNGW5iSRmXdAmMknggVLbsqu8gmdYh+WRly2PtWW9vKt2kkkySSEbjgFglSxOu6XbcMhzuLMmM/YULNQPED5bv5oQknllyz/7VJ5DS22U8lEx6nlb1D7VNAWjR5I549gPEsq8V3BGZYXz5LtuJDyttX9K1hB41VoDIkAmJGfMkPC/pXFvC6WpkljRweA5bCqP7mp2CtZrNJGSQcCVpCAv2GeayeAyxq/ktsDf5j/lP2H96xjiRcWiShERThfMc5bn2FdyodnmpFwCN80kn5/gCpJ4xICsMLzzgYDFsIv6135cO9VkczXO0EQxk4X5rGOjALliwi8zgEu7HB+1ZTCWGUqFg8y4YY3Ro4UJx9jmt0Ahk7Pd6gfOwbeDBbPIZs96gu8396LJclEbdOxP5ie32rKymAT6nmFVtLY5lk9AK9hQ10v09rFbwEBmO0gcD5NZWVjHBXzXjs0UeXCu5yvX5FTQXRnW5eUfguy7D/CiDgAfcmsrKxgnQbaJrDVde1HcFhQi3Xdjnjn+ZApRPK+pahbW8eWghAdhnbn3P65rKyljuw+h7ZwPe3kVpCT511G7u4T1KgUgBRn8x/pml1rdpJpQFmWtxPvighPVFz65GPdiR17YGKysoew+iCeFhBaaTC7M77fO9lXqAPipdfuvprVNPsSdxHJPGB2ArKyihWAay/wCybCG1iYAxxlBjqWYeo1FZW5s9OihwwkujvkccYFZWU3o3sKhliMz3zoq21kn4Q92rIraR7aS6vP8A9ueTAI6ru6fyH+tZWUoQq91p9OEFijSM7Eb9ijc5+TRk30/kAytOrSKc+SwJx7E44/lW6ylkgw7JLeyae1SPTbB7dRH+aWTa0v3JBpTe6Lo9riS+1KWa5HJghfOPgsRW6ygFie6urdGxHZRxxkcLtyf5mg5Lqd0HkWYVDwABxWVlOhGRGyvXG6RwifBoeWL6dGHmffHJNbrKaxTnZuTcgbngBqhkRuvOP6VlZRMRgAgYwffFaK+rGMVlZWFNBCT+asAOcdftWVlYxsEjOcith2zjPFZWUBjrcfgisB3HAXpWVlExzvB7feug3BODisrKxjecjPIrnPyaysrGNsTjPOPvW8gEZJ5rKysE2SM4HP3rTELjHJPasrKBjrPIHp5PNa6uBt46cc1usrAs5XPmHIYAfujrUiRnBMgYD45NarKJmbiXYxfcyL7kc1JHjLtvx23tyf0rKysKjqHMcZk8zazdMjLEV0yf8NkiJc/vPy36e1arKwxm1tgEUJ5/5jZyft7VIwVHXETGTI9ZOAKysrGJJVHmoyyNLITzuPpWoxvWQA7Dj1b8dPjrzWVlBhQSsiktJuKkryWG7J/6a6tAXnzvZJOcPIP9R2rdZShCLORxMywzec4GSzr6VPzU1ukr3MhEkM8xHpkY+lfsKysrGIUM0csqhoJXByWPKiogxVCrLHKznkkZC/pWVlYx1EFkUAQNO6+kMeNlT7EfYtyDLMOkat6aysrGCblHjjCy75E3jFrbxH0/JNHfSxzvHE00iReYBshjJ/R+OPvWVlYxHeP9LMyalMYoScRJblwwxxywH9KysrKxrP/Z",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492899884",
    "name": "كول سلو",
    "description": "",
    "price": 49,
    "category": "السلطات",
    "image": "https://modo3.com/thumbs/fit630x300/90578/1467114229/طريقة_عمل_سلطة_كول_سلو.jpg",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492818896",
    "name": "سلطة يونانية",
    "description": "",
    "price": 125,
    "category": "السلطات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfidd7J5yL-fK9wT_kmNzet1OZqFNidPUbWW5YmfkorK4MD1y1BUZjnmcZgTvJyFtsDu7&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492746034",
    "name": "سيزر دجاج",
    "description": "",
    "price": 170,
    "category": "السلطات",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOD18F3rhgo53F978mU8-4YVYO3sF3S-5ENmlJ7JYnw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492497778",
    "name": "شوربة لسان عصفور",
    "description": "",
    "price": 55,
    "category": "الشوربة",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNjlqy3w9liHyW6NjAJrsed3Ax7sDGZIqLFEaU9TVOA&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784492358095",
    "name": "شوربة خضار",
    "description": "",
    "price": 60,
    "category": "الشوربة",
    "image": "data:image/jpeg;base64,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",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784398477774",
    "name": "شوربة عدس",
    "description": "",
    "price": 65,
    "category": "الشوربة",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHapWx_MkYV00VFkA5Wj8FaEYlNcimzXXPfot3vhYKMb0U0yuSf-jpF6ta2XtH02TgRmgbsw&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  },
  {
    "id": "custom_1784398348234",
    "name": "شوربة كريمة مشروم ",
    "description": "",
    "price": 130,
    "category": "الشوربة",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpeDofFF42DGEbkXKnvT6WUXKNpKvzx0GMfzh8S7M_tQ&s=10",
    "organic": false,
    "popular": false,
    "rating": 5
  }
];

export const CATEGORIES = [
  "أطباق رئيسية",
  "حلويات",
  "الشوربة",
  "البيتزا",
  "السلطات",
  "الافطار",
  "الساندوتشات",
  "التوست",
  "مشروبات",
  "الباستا"
];
export const GUESTS_OPTIONS = ["1", "2", "3", "4", "5+"];
export const TIME_SLOTS = ["07:00 م", "07:30 م", "08:00 م", "08:30 م", "09:00 م", "09:30 م"];

export const OCTOBER_DAYS = [
  { dayName: "السبت", dayNum: "14" },
  { dayName: "الأحد", dayNum: "15" },
  { dayName: "الاثنين", dayNum: "16" },
  { dayName: "الثلاثاء", dayNum: "17" },
  { dayName: "الأربعاء", dayNum: "18" },
  { dayName: "الخميس", dayNum: "19" },
  { dayName: "الجمعة", dayNum: "20" }
];
