import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyPageSidebar({ isExpanded }) {
  const [openCategory, setOpenCategory] = useState('');
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    if (category === 'home') {
      navigate(links[category][0].url);
      setOpenCategory(''); // 홈이 선택되면 다른 하위 목록 닫기
    } else {
      setOpenCategory(openCategory === category ? '' : category);
    }
  };

  return (
    <div className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}>
      <ul>
        {['home', 'reviews', 'goals'].map((category) => (
          <li key={category} onClick={() => toggleCategory(category)}
              className={`category-item ${openCategory === category ? 'open' : ''}`}
              data-category={category}>
            <strong>{categoryTitles[category]}</strong>
            {openCategory === category && category !== 'home' && (
              <ul className="subcategory-list">
                {links[category].map((link) => (
                  <li key={link.name} className="subcategory-item">
                    <Link to={link.url}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const categoryTitles = {
  home: '홈',
  reviews: '리뷰',
  goals: '목표',
}

const links = {
  home: [
    {name: 'Home', url: '/home'}
  ],
  reviews: [
    {name: '리뷰 관리', url: '/my-page/review-management'},
    {name: '내 리뷰', url : '/my-page/my-review'}
  ],
  goals: [
    {name: '목표 설정', url: '/goals'}
  ]
}

export default MyPageSidebar;
