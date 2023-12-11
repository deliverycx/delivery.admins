import React, { useState } from 'react';

const Menu = ({
                  organization,
                  data,
                  handlers
              }: {
    organization: string;
    data: any;
    handlers: any;
}) => {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(
        data.groups[0].id
    );
    const [searchText, setSearchText] = useState('');
    const [hiddenProducts, setHiddenProducts] = useState(
        data.hiddenProducts?.hiddenProduct || []
    );

    const handleTabClick = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const toggleProduct = async (product: any) => {
        const productId = product.id;
        if (hiddenProducts.includes(productId)) {
            const updatedHiddenProducts = hiddenProducts.filter(
                (id: string) => id !== productId
            );
            setHiddenProducts(updatedHiddenProducts);
        } else {
            setHiddenProducts([...hiddenProducts, productId]);
        }

        if (hiddenProducts.includes(productId)) {
            await handlers.hideProduct(organization, productId);
        } else {
            await handlers.hideProduct(organization, productId);
        }
    };

    const filteredProducts = data.products.filter(
        (product: any) =>
            product.parentGroup === selectedGroup &&
            product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="tabs">
                {data.groups.map((group: any) => (
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
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="products">
                {filteredProducts.map((product: any) => {
                    const isHidden = hiddenProducts.includes(product.id);

                    return (
                        <div
                            key={product.id}
                            className={`product ${isHidden ? 'hidden' : ''}`}
                        >
                            <img src={product.imageLinks[0]} alt={product.name} />
                            <div className="product-content">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>
                                    Цена: <strong>{product.sizePrices[0].price.currentPrice}</strong> ₽
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
    );
};

export default Menu;
