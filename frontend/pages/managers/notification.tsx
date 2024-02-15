import Container from "application/components/common/Container/Container"
import Footer from "application/components/common/Footer/Footer"
import Header from "application/components/common/Header/Header"
import Menu from "application/components/common/Menu/Menu"
import MenuAdmins from "application/components/common/Menu/MenuAdmins"
import OrdersPayment from "application/components/core/Orders/OrdersPayment/OrdersPayment"
import { userRout } from "application/contstans/userRout.const"
import { withCheckSession } from "application/helpers/session"
import { NextPage } from "next"
import OrdersDelivery from "application/components/core/Orders/OrdersDelivery/OrdersDelivery"

const AdminPage: NextPage = ({ user }: any) => {
	console.log(user);
	return (
		<div className="wrapper">
			<Header />
			<MenuAdmins />
			<Container>
				<div className="col-12 ma0-l">
					<div className="col-2 card-header">
						<h1>Справочная</h1>
					</div>
					<div className="card card-primary">
						<div className="card-header">
							<h4 className="card-title">Инструкция: оплаченные картой заказы</h4>
						</div>
						<div className="card-body">
							<div className="notif_payment">

								<div>Прочитайте подробную инструкцию по алгоритмам действий, с оплаченными картой заказами
, <a href="../Инструкция_по_работе_с_заказами_с_онлайн_оплатой.pdf" target="_blank"><strong>здесь</strong></a></div>
								<h5>или просмотрите видео</h5>
								
								<div>
								<h4>Ожидание оплаты в айко</h4>
								<video width="520" height="340" controls preload="none">
						      <source src="../pay1.mp4" type="video/mp4" />
						  
						      Your browser does not support the video tag.
						    </video>
								<br />
								<h4>Подтверждение или отмена заказа, в администраторской панели</h4>
								<video width="520" height="340" controls preload="none">
						      <source src="../pay2.mp4" type="video/mp4" />
						  
						      Your browser does not support the video tag.
						    </video>

								</div>
							</div>
							<h2>Вопрос, ответ (faq)</h2>
							<p>
							Вопрос: как закрывать онлайн оплату? <br />
Ответ: Как и любой другой заказ
							</p>
							<p>
							Вопрос: Когда мы отменяем заказ, мы делаем отмену покупки или возврат денежных средств. Вопрос о времени возврата дс <br />
Ответ: Когда вы хотите сделать, возврат вам нужно зайти в админ панель, в заказ и нажать отмена и гостю сразу вернутся деньги, отмена заказа в айко на платеж не влияет

							</p>

							<p>
							Вопрос: Добавление новых позиций в заказ или когда гость передумает <br />
Ответ: Если гость оплатил заказ, к примеру 500р, но в ходе разговора он решил изменить его(добавить позиции или удалить) вам нужно:
1. предложить гостью оформить заказ заново
2. зайти в админ панель и нажать  "отменить", в данном заказе
изменение суммы оплаты на данный момент нету
							</p>

							<p>
							Вопрос: гость не смог оплатить <br />
Ответ: если у человека не получилось оплатить, вы можете дальше работать с его заказом

							</p>

							<p>
							Вопрос: Подскажите, а как нам брать дополнительную оплату за доставку, после того как заказ оплачен и есть дальние расстояния, где сумма доставки увеличивается? <br />
Ответ: Оплата прошла, цена доставки включена, если цена доставки выше придется отменять оплату или как-то договариваться с гостем или в таком случае лучший вариант — принимать оплату за отдаленную доставку через курьера
в любом случае, если гостю нужно вернуть деньги, нажимайте "отмена" в админ панели, если у вас вызывает сомнения или возник вопрос, тегайте нас, мы поможем

							</p>

							<p>
							Вопрос: Заявку оставили, а оплата почему то не проходит <br />
Ответ: Возможно заказ в обработке или человек долго думает по факту ему на оплату дают до 5мин, вы можете сами выбрать лимит ожидания оплаты, после чего звонить гостю

							</p>

							<p>
							Вопрос: что нужно сделать что бы деньги поступили на счет <br />
Ответ: в конце смены, вам нужно нажать "подтвердить" в админ панели, что бы деньги поступили вам на счет, как описано в справочнике

							</p>
							
									
						</div>
					</div>
					
				</div>
			</Container>



		</div>
	)
}
export default AdminPage
export const getServerSideProps = withCheckSession({ ...userRout.admins })