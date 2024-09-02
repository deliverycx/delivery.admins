import { useEffect, useMemo, useState } from "react";
import { RequestOrganization } from "servises/repository/Axios/Request";
import { requestOrganizationFoods } from "servises/repository/Axios/Request/Request.OrganizationFoods";


export function useOrganizationMenu(this: any, slideId: string) {
	const [organizationMenu, setOrganizationMenu] = useState<any>(null)
	const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
	const [searchText, setSearchText] = useState('');
	const [hiddenProducts, setHiddenProducts] = useState<any>([]);

	useEffect(() => {
		if (slideId) {
			getOrganizationFoods(slideId)
			getHiddenProductsByOrg(slideId)
		}
	}, [slideId])

	useEffect(() => {
		organizationMenu && setSelectedGroup(organizationMenu.categoryes[0].id)
	}, [organizationMenu])


	const getOrganizationFoods = async (slideId: string) => {
		try {
			const { data } = await requestOrganizationFoods.getAllFoods({ organizationId: slideId })
			setOrganizationMenu(data)
		} catch (e) {
			console.log(e)
		}
	}

	const getHiddenProductsByOrg = async (organization: any) => {
		try {
			const { data } = await requestOrganizationFoods.getHiddenProductsByOrg({
				organization
			})
			data && setHiddenProducts(data.hiddenProduct)
		} catch (e) {
			console.log('error get', e)
		}
	}

	const hideProduct = async (organization: any, productId: any) => {
		try {
			await requestOrganizationFoods.hideProduct({
				organization,
				productId
			})
		} catch (e) {
			console.log('error hide', e)
		}
	}

	const handleTabClick = (groupId: string) => {
		setSelectedGroup(groupId);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};

	const filteredProducts = useMemo(() => {

		if (organizationMenu) {
			return organizationMenu.products.filter((product: any) =>
				product.category === selectedGroup && product.name.toLowerCase().includes(searchText.toLowerCase())
			);
		} else {
			return null
		}

	}, [searchText, organizationMenu, selectedGroup])



	const toggleProduct = async (product: any) => {
		Array.isArray(hiddenProducts) && new Promise((res: any) => {
			let hidden

			if (hiddenProducts.includes(product.id)) {
				hidden = hiddenProducts.filter((value: any) => {
					return value !== product.id
				})
			} else {
				hidden = [...hiddenProducts, product.id]
			}

			res(hidden)
		}).then((value) => {
			hideProduct(slideId, value)
			getHiddenProductsByOrg(slideId)
		})


	};


	this.data({
		organizationMenu,
		selectedGroup,
		filteredProducts,
		hiddenProducts
	})
	this.handlers({
		handleTabClick,
		handleSearchChange,
		toggleProduct
	})
	this.status({

	})

}