import React, { useState, useMemo } from 'react';
import './Admin_OrganizationSelector.css'; // CSS 파일 임포트

function OrganizationSelector({ organizations, onSelect }) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (organization) => {
        onSelect(organization); // 부모 컴포넌트로 선택된 조직 전달
        setVisible(false); // 선택 후 모달 닫기
    };

    const renderOrganizations = useMemo(() => {
        const render = (orgs) => {
            return orgs.map(org => (
                <div key={org.id} className="organization-item" style={{ paddingLeft: `${20 * (org.parentOrg ? 1 : 0)}px` }}>
                    <span onClick={() => handleSelect(org)}>
                        {org.name}
                    </span>
                    {org.children && org.children.length > 0 && render(org.children)}
                </div>
            ));
        };
        return render(organizations);
    }, [organizations]);

    return (
        <>
            <button onClick={() => setVisible(true)}>조직 선택</button>
            {visible && (
                <div className="organization-modal" role="dialog" aria-labelledby="org-selector-modal">
                    {renderOrganizations}
                </div>
            )}
        </>
    );
}

export default OrganizationSelector;
