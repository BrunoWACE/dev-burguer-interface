import { useState, useEffect } from 'react';

import { api } from '../../services/api';

export function CategoryCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('/categories');

      console.log(response);
    }
    loadCategories();
  }, []);

  return (
    <div>
      <h1>OK</h1>
    </div>
  );
}
