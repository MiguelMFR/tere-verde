import "./Tabs.css"

const AdminTabs = ({ activeTab, onTabChange, categories }) => {
  return (
    <div className="tabs-container">
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
