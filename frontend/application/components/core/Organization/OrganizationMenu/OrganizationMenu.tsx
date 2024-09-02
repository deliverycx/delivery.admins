import { adapterComponentUseCase } from "adapters/adapterComponents"
import { useOrganizationMenu } from "domains/useCase/organization/useCase.OrganizationMenu"
import { FC, useState } from "react"

const OrganizationMenu: FC<{ slideId: string }> = ({ slideId }) => {
	const useCase = adapterComponentUseCase(useOrganizationMenu, slideId)
	const { organizationMenu, selectedGroup, filteredProducts, hiddenProducts } = useCase.data
	const { handleTabClick, handleSearchChange, toggleProduct } = useCase.handlers



	return (
		<>
			<div>
				<div className="tabs">
					{
						organizationMenu &&
						organizationMenu.categoryes.map((group: any) => (
							<div
								key={group.id}
								onClick={() => handleTabClick(group.id)}
								className={`tab ${selectedGroup === group.id ? 'active' : ''}`}
							>
								{group.name}
							</div>
						))}
				</div>
				<div className="search-block">
					<input
						type="text"
						placeholder="Поиск по названию блюда"
						onChange={handleSearchChange}
						className="search-input"
					/>
				</div>
				<div className="products">
					{filteredProducts && filteredProducts.map((product: any) => {
						const isHidden = hiddenProducts.includes(product.id);

						return (
							<div
								key={product.id}
								className={`product ${isHidden ? 'hidden' : ''}`}
							>
								<img src={product.image} alt={product.name} />
								<div className="product-content">
									<h3>{product.name}</h3>
									<p>{product.description}</p>
									<p>
										Цена: <strong>{product.price}</strong> ₽
									</p>
									<button onClick={() => toggleProduct(product)}>
										{isHidden ? 'Показать товар' : 'Скрыть товар'}
									</button>
								</div>
							</div>
						);
					})}
				</div>

			</div>
		</>
	)
}
export default OrganizationMenu