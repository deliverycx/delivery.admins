import React, { useState } from 'react';

const Menu = ({ groups, products }: any) => {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(groups[0].id); // Установите начальное значение на первый таб
    const [searchText, setSearchText] = useState('');

    const handleTabClick = (groupId: string) => {
        setSelectedGroup(groupId);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const filteredProducts = products.filter((product: any) => {
        return (product.parentGroup === selectedGroup) && (product.name.toLowerCase().includes(searchText.toLowerCase()));
    });

    return (
        <div>
            <div className="tabs">
                {groups.map((group: any) => (
                    <div
                        key={group.id}
                        onClick={() => handleTabClick(group.id)}
                        className={`tab ${selectedGroup === group.id ? 'active' : ''}`}
                    >
                        {group.name}
                    </div>
                ))}
            </div>
            <div className='search-block'>
                <input
                    type="text"
                    placeholder="Поиск по названию блюда"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div className="products">
                {filteredProducts.map((product: any) => (
                    <div key={product.id} className="product">
                        <img src={product.imageLinks[0]} alt={product.name} />
                        <div className='product-content'>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Цена: <strong>{product.sizePrices[0].price.currentPrice}</strong> ₽</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
