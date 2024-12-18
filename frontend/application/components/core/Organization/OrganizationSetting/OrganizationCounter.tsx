import { FC, useEffect, useState } from "react"
import RequestOrganizationCount from "servises/repository/Axios/Request/Request.OrganizationCount"
import { compareAsc, format } from 'date-fns'

function dtime_nums(e: any) {
	// eslint-disable-next-line no-var
	var n = new Date;
	n.setDate(n.getDate() + e);
	return format(n, "yyy-LL-dd") //n.toLocaleDateString();
}

const OrganizationCounter: FC<{ organization: any }> = ({ organization }) => {
	const [counterHI, setCounterHi] = useState<any>(null)
	const [value, setValue] = useState<any>()

	const getCoutn = async () => {
		try {
			const { data } = await RequestOrganizationCount.CRUDFabric.getBuOrg(organization.id)
			if (data) {
				setValue(data.url)
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		organization && getCoutn()
	}, [organization])

	const handlerCouter = async () => {
		try {
			const dates = format(new Date(), 'yyyy-MM-dd')
			await RequestOrganizationCount.findBuOrg(counterHI ? { ...counterHI } :
				{
					organization: organization.id,
					url: value
				}
			)
			getCoutn()
		} catch (error) {
			console.log(error);
		}
	}

	const handlerCheckCounter = async () => {
		try {
			const qdate = format(new Date(), 'yyyy-MM-dd')
			const date = {
				dateFrom: "2015-01-01",
				dateTo: dtime_nums(1)
			}
			const { data } = await RequestOrganizationCount.checkCount({ url: value, date })
			data && setCounterHi(data)
		} catch (error) {

		}
	}

	return (
		<div className="card card-primary">
			<div className="card-header">
				<h3 className="card-title">Счечик хинкалий</h3>
			</div>
			<div className="card-body">
				<div className="form-group">

					<label>Введите адресс</label>
					<input type="text" value={value} onChange={e => setValue(e.target.value)} /><br />
					<small>пример: cx-adler-kirova.iiko.it(без слешей)</small>
				</div>

				<button type="submit" className="btn btn-success" onClick={handlerCouter}>Сохранить</button>
				<a className="btn" onClick={handlerCheckCounter}>проверить счетчик</a>
				{
					counterHI && <span>кол-во хинкали: {counterHI}</span>
				}
			</div>
			<div className="card-body">
				<h3 className="card-title">ссылка на счечик хинкалий:</h3>
				<br />
				<a href={`http://счетчик.хинкалыч.рф/?organization=${organization.id}`} target="_blank">{`http://счетчик.хинкалыч.рф/?organization=${organization.id}`}</a>
			</div>

		</div>
	)
}
export default OrganizationCounter