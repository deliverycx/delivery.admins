export const ROUTE_PAGE = [
	{
		path:'dashbord',
		name:"Дашборд"
	},
	{
		path:'upload',
		name:"Обновление Айко"
	},
	{
		path:'organization',
		name:"Организации"
	},
	{
		path:'users',
		name:"Пользователи"
	},
	{
		path:'#',
		name:"Банеры",
		child:[
			{
				path:'banners/mainbanner',
				name:"Банеры"
			},
			{
				path:'banners/groops',
				name:"Группы"
			},
			{
				path:'banners/display',
				name:"Отображение"
			}
		]
	},
	{
		path:'order/ordersDelivery',
		name:"Заказы доставка"
	},
	

]