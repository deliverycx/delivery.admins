export enum PaymentStatuses {
	"AUTHORIZED" = "Authorized",
	"SUCCESSED" = "Settled",
	"CANCELLED" = "Cancelled",
	"REJECTED" = "Rejected",
	"CONFIRMATION" = "Confirmation",
	"PENDING" = "Pending",
	"Return" = "Return"
}

export enum  OrderStatus {
	Unconfirmed = "Обработка заказа",
	placed = "Создали заказ",
	сooking = "Готовится",
	in_road = "В пути",
	completed = "Доставлена",
	canceled = "Отменен"
}


export const  OrderCreationStatus = {
	ERROR:"ERROR",
	"PROGRES":"InProgress",
	SUCCESS:"Success"
}
