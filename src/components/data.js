const initialOrganizations = [
    {
        id: 'org1',
        name: '조직 A',
        children: [
            {
                id: 'org1-1',
                name: '조직 A-1',
                children: []
            },
            {
                id: 'org1-2',
                name: '조직 A-2',
                children: [
                    {
                        id: 'org1-2-1',
                        name: '조직 A-2-1',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'org2',
        name: '조직 B',
        children: [
            {
                id: 'org2-1',
                name: '조직 B-1',
                children: []
            }
        ]
    },
    {
        id: 'org3',
        name: '조직 C',
        children: []
    }
];

export default initialOrganizations;
