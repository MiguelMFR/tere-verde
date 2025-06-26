const AdminTabs = ({ activeTab, onTabChange, categories }) => {
  return (
    <div className="tabs">
      {categories.map((category, index) => (
        <div
          key={category.name}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => onTabChange(index)}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default AdminTabs; 
