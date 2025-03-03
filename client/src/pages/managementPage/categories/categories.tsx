import React from 'react';
import style from './categories.module.css';

interface Category {
  id: number;
  name: string;
}

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
  selectedCategory?: string; // Props to follow the current category
}

const Categories = ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
  const categories: Category[] = [
    { id: 1, name: 'ניהול משתמשים' },
    { id: 2, name: 'ניהול ספרים' },
    { id: 3, name: 'ניהול סופרים' },
  ];

  return (
    <div className={style.categories}>
      <br />
      <br />
      <br />
      <br />

      <div>
        {categories.map((category) => (
          <div key={category.id} className={style.categoryItem}>
            <button
              onClick={() => onCategorySelect(category.name)}
              className={`${style.categoryButton} ${selectedCategory === category.name ? style.active : ''}`}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
