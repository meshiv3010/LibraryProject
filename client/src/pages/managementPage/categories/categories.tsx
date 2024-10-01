import React from 'react';
import style from './categories.module.css';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const categories = [
    { id: 1, name: 'ניהול משתמשים' },
    { id: 2, name: 'ניהול ספרים' },
    { id: 3, name: 'ניהול סופרים' },
  ];

  return (
    <div className={style.categories}>
      <div>
        {categories.map(category => (
          <div key={category.id} className={style.categoryItem}>
            <button onClick={() => onCategorySelect(category.name)}>
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
