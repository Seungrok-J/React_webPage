import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isExpanded }) { // 구조 분해 할당을 사용하여 isExpanded 추출
  const [openCategory, setOpenCategory] = useState('');

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? '' : category);
  };

  // 카테고리 리스트를 개선하여 코드 중복을 줄임
  const categories = [
    { key: 'home', title: '홈' },
    { key: 'reviews', title: '리뷰' },
    { key: 'goals', title: '목표' }
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'sidebar-expanded' : ''}`}>
      <ul>
        {categories.map(({ key, title }) => ( // categories 배열을 이용하여 반복 렌더링
          <li key={key} onClick={() => toggleCategory(key)}
              className={`category-item ${openCategory === key ? 'open' : ''}`}>
            <strong>{title}</strong>
            {openCategory === key && (
              <ul className="subcategory-list">
                {links[key].map((link) => (
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

const links = {
  home: [
    { name: '구성원 관리', url: '/admin/' },
    { name: '조직 관리', url: '/admin/organization-management' }
  ],
  reviews: [
    { name: '리뷰 관리', url: '/admin/review-management' },
    { name: '템플릿 관리', url: '/admin/template-management' },
    { name: '종합검색', url: "/admin/comprehensiveSearch"}
  ],
  goals: [
    { name: '목표 관리', url: '/admin/goal-management' },
    { name: '목표 권한 관리', url: '/admin/goal-permission' }
  ]
};

export default Sidebar;
