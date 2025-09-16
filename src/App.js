import React, { useState, useReducer } from 'react';
import { Search, Plus, X, Settings, RefreshCw } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';

// Chart data
const chartData = {
  cloudAccounts: [
    { name: 'Connected', value: 2, color: '#10B981' },
    { name: 'Not Connected', value: 2, color: '#EF4444' }
  ],
  riskAssessment: [
    { name: 'Failed', value: 1689, color: '#EF4444' },
    { name: 'Warning', value: 681, color: '#F59E0B' },
    { name: 'Not Available', value: 36, color: '#6B7280' },
    { name: 'Passed', value: 7253, color: '#10B981' }
  ],
  namespaceAlerts: [
    { name: 'kube-system', alerts: 45, severity: 'high' },
    { name: 'default', alerts: 32, severity: 'medium' },
    { name: 'monitoring', alerts: 28, severity: 'high' },
    { name: 'ingress-nginx', alerts: 15, severity: 'low' },
    { name: 'cert-manager', alerts: 12, severity: 'medium' }
  ],
  workloadAlerts: [
    { time: '00:00', alerts: 12 },
    { time: '04:00', alerts: 8 },
    { time: '08:00', alerts: 15 },
    { time: '12:00', alerts: 22 },
    { time: '16:00', alerts: 18 },
    { time: '20:00', alerts: 9 }
  ],
  imageRisk: [
    { name: 'Critical', value: 9, color: '#DC2626' },
    { name: 'High', value: 150, color: '#EA580C' },
    { name: 'Medium', value: 50, color: '#D97706' },
    { name: 'Low', value: 2, color: '#65A30D' }
  ],
  securityIssues: [
    { name: 'Critical', value: 2, color: '#DC2626' },
    { name: 'High', value: 2, color: '#EA580C' },
    { name: 'Medium', value: 4, color: '#D97706' },
    { name: 'Low', value: 10, color: '#65A30D' }
  ]
};

// Chart Components
const DonutChart = ({ data, title }) => (
  <div className="h-full flex flex-col">
    <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Count']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-2 space-y-1">
      {data.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-gray-600">{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const BarChartComponent = ({ data, title }) => (
  <div className="h-full flex flex-col">
    <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            fontSize={10} 
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={40}
          />
          <YAxis fontSize={10} />
          <Tooltip />
          <Bar dataKey="alerts" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const LineChartComponent = ({ data, title }) => (
  <div className="h-full flex flex-col">
    <h3 className="font-semibold text-gray-900 text-sm mb-2">{title}</h3>
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="alerts" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Initial data structure with charts
const initialDashboardData = {
  categories: {
    'cspm-executive': {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: {
        'cloud-accounts': { 
          id: 'cloud-accounts', 
          name: 'Cloud Accounts', 
          text: 'Connected (2)\nNot Connected (2)\n\nTotal: 4 Accounts',
          type: 'chart',
          chartType: 'donut',
          chartData: chartData.cloudAccounts
        },
        'cloud-risk-assessment': { 
          id: 'cloud-risk-assessment', 
          name: 'Cloud Account Risk Assessment', 
          text: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)\n\nTotal: 9,659 Assessments',
          type: 'chart',
          chartType: 'donut',
          chartData: chartData.riskAssessment
        }
      }
    },
    'cwpp-dashboard': {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: {
        'namespace-alerts': { 
          id: 'namespace-alerts', 
          name: 'Top 5 Namespace Specific Alerts', 
          text: 'No Graph data available!\n\nPlease check your data source configuration.',
          type: 'chart',
          chartType: 'bar',
          chartData: chartData.namespaceAlerts
        },
        'workload-alerts': { 
          id: 'workload-alerts', 
          name: 'Workload Alerts', 
          text: 'No Graph data available!\n\nWorkload monitoring is currently offline.',
          type: 'chart',
          chartType: 'line',
          chartData: chartData.workloadAlerts
        }
      }
    },
    'registry-scan': {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: {
        'image-risk': { 
          id: 'image-risk', 
          name: 'Image Risk Assessment', 
          text: 'Critical (9)\nHigh (150)\nMedium (50)\nLow (2)\n\nTotal Images Scanned: 211',
          type: 'chart',
          chartType: 'donut',
          chartData: chartData.imageRisk
        },
        'image-security': { 
          id: 'image-security', 
          name: 'Image Security Issues', 
          text: 'Critical (2)\nHigh (2)\nMedium (4)\nLow (10)\n\nTotal Issues: 18',
          type: 'chart',
          chartType: 'donut',
          chartData: chartData.securityIssues
        }
      }
    }
  },
  lastUpdated: new Date().toISOString()
};

// Reducer for complete state management
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WIDGET': {
      const newState = {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: {
            ...state.categories[action.categoryId],
            widgets: {
              ...state.categories[action.categoryId].widgets,
              [action.widget.id]: action.widget
            }
          }
        },
        lastUpdated: new Date().toISOString()
      };
      return newState;
    }
    
    case 'REMOVE_WIDGET': {
      const categoryWidgets = { ...state.categories[action.categoryId].widgets };
      delete categoryWidgets[action.widgetId];
      
      const newState = {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: {
            ...state.categories[action.categoryId],
            widgets: categoryWidgets
          }
        },
        lastUpdated: new Date().toISOString()
      };
      return newState;
    }

    case 'RESET_DASHBOARD': {
      return { ...initialDashboardData };
    }
    
    default:
      return state;
  }
};

// Individual Widget Component
const Widget = ({ widget, categoryId, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showChart, setShowChart] = useState(true);

  const renderContent = () => {
    if (widget.type === 'chart' && widget.chartData && showChart) {
      switch (widget.chartType) {
        case 'donut':
          return <DonutChart data={widget.chartData} title={widget.name} />;
        case 'bar':
          return <BarChartComponent data={widget.chartData} title={widget.name} />;
        case 'line':
          return <LineChartComponent data={widget.chartData} title={widget.name} />;
        default:
          return (
            <div className="h-full flex flex-col">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">{widget.name}</h3>
              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed overflow-y-auto flex-1">
                {widget.text}
              </div>
            </div>
          );
      }
    }
    
    return (
      <div className="h-full flex flex-col">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">{widget.name}</h3>
        <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed overflow-y-auto flex-1">
          {widget.text}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 h-72 relative transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-3 right-3 flex gap-1 transition-all duration-200 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        {widget.type === 'chart' && (
          <button
            onClick={() => setShowChart(!showChart)}
            className="p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
            title={showChart ? 'Show text view' : 'Show chart view'}
          >
            {showChart ? (
              <div className="w-4 h-4 text-blue-600 text-xs flex items-center justify-center font-bold">T</div>
            ) : (
              <div className="w-4 h-4 text-blue-600 text-xs flex items-center justify-center font-bold">📊</div>
            )}
          </button>
        )}
        <button
          onClick={() => onRemove(categoryId, widget.id)}
          className="p-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
          title="Remove widget"
        >
          <X size={16} className="text-red-600" />
        </button>
      </div>
      
      <div className="h-full pr-12">
        {renderContent()}
      </div>
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        {widget.type === 'chart' ? '📊' : '📝'} {widget.id}
      </div>
    </div>
  );
};

// Add Widget Modal Component
const AddWidgetModal = ({ isOpen, onClose, categoryId, categoryName, onAdd }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [widgetType, setWidgetType] = useState('text');
  const [chartType, setChartType] = useState('donut');
  const [errors, setErrors] = useState({});

  const generateSampleChartData = (type) => {
    switch (type) {
      case 'donut':
        return [
          { name: 'Active', value: 65, color: '#10B981' },
          { name: 'Inactive', value: 25, color: '#EF4444' },
          { name: 'Pending', value: 10, color: '#F59E0B' }
        ];
      case 'bar':
        return [
          { name: 'Jan', alerts: 12 },
          { name: 'Feb', alerts: 19 },
          { name: 'Mar', alerts: 15 },
          { name: 'Apr', alerts: 8 },
          { name: 'May', alerts: 22 }
        ];
      case 'line':
        return [
          { time: '00:00', alerts: 5 },
          { time: '06:00', alerts: 12 },
          { time: '12:00', alerts: 8 },
          { time: '18:00', alerts: 15 },
          { time: '24:00', alerts: 3 }
        ];
      default:
        return [];
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!widgetName.trim()) {
      newErrors.name = 'Widget name is required';
    } else if (widgetName.trim().length < 3) {
      newErrors.name = 'Widget name must be at least 3 characters';
    }
    
    if (!widgetText.trim()) {
      newErrors.text = 'Widget text is required';
    } else if (widgetText.trim().length < 10) {
      newErrors.text = 'Widget text must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newWidget = {
        id: `widget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: widgetName.trim(),
        text: widgetText.trim(),
        type: widgetType,
        createdAt: new Date().toISOString()
      };
      
      if (widgetType === 'chart') {
        newWidget.chartType = chartType;
        newWidget.chartData = generateSampleChartData(chartType);
      }
      
      onAdd(categoryId, newWidget);
      handleClose();
    }
  };

  const handleClose = () => {
    setWidgetName('');
    setWidgetText('');
    setWidgetType('text');
    setChartType('donut');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-90vh overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Widget</h2>
              <p className="text-sm text-gray-600 mt-1">Category: {categoryName}</p>
            </div>
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Name *
              </label>
              <input
                type="text"
                value={widgetName}
                onChange={(e) => {
                  setWidgetName(e.target.value);
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter widget name (e.g., 'Security Metrics')"
                maxLength={50}
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
              <p className="text-xs text-gray-500 mt-1">{widgetName.length}/50 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Type
              </label>
              <select
                value={widgetType}
                onChange={(e) => setWidgetType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="text">Text Widget</option>
                <option value="chart">Chart Widget</option>
              </select>
            </div>
            
            {widgetType === 'chart' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chart Type
                </label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="donut">Donut Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Content *
              </label>
              <textarea
                value={widgetText}
                onChange={(e) => {
                  setWidgetText(e.target.value);
                  if (errors.text) setErrors({...errors, text: ''});
                }}
                className={`w-full border rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.text ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter widget content (supports line breaks)&#10;Example:&#10;Active: 15&#10;Inactive: 3&#10;Pending: 7"
                maxLength={500}
              />
              {errors.text && <p className="text-red-600 text-xs mt-1">{errors.text}</p>}
              <p className="text-xs text-gray-500 mt-1">{widgetText.length}/500 characters</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Add Widget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Widget Management Modal Component
const WidgetManagementModal = ({ isOpen, onClose, dashboardData, onToggleWidget }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get all widgets with category info
  const getAllWidgets = () => {
    const allWidgets = [];
    Object.values(dashboardData.categories).forEach(category => {
      Object.values(category.widgets).forEach(widget => {
        allWidgets.push({
          ...widget,
          categoryId: category.id,
          categoryName: category.name
        });
      });
    });
    return allWidgets;
  };

  const allWidgets = getAllWidgets();
  
  // Filter widgets based on search and category
  const filteredWidgets = allWidgets.filter(widget => {
    const matchesSearch = searchTerm === '' || 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || widget.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-90vh overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Widget Management</h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredWidgets.length} of {allWidgets.length} widgets shown
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search widgets by name, content, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
            >
              <option value="all">All Categories</option>
              {Object.values(dashboardData.categories).map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={clearSearch}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Clear filters"
              >
                <RefreshCw size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredWidgets.length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'No widgets available in the dashboard'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.values(dashboardData.categories).map(category => {
                const categoryWidgets = filteredWidgets.filter(w => w.categoryId === category.id);
                
                if (categoryWidgets.length === 0) return null;
                
                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {categoryWidgets.length} widget{categoryWidgets.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryWidgets.map(widget => (
                        <div key={widget.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={() => onToggleWidget(widget.categoryId, widget.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm mb-1">{widget.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {widget.text.length > 60 ? `${widget.text.substring(0, 60)}...` : widget.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {widget.type === 'chart' ? '📊' : '📝'} {widget.id}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Click checkbox to remove widget from dashboard
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DynamicDashboard = () => {
  const [dashboardState, dispatch] = useReducer(dashboardReducer, initialDashboardData);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  // Widget management functions
  const handleAddWidget = (categoryId, widget) => {
    dispatch({ type: 'ADD_WIDGET', categoryId, widget });
    console.log('Widget added:', widget, 'to category:', categoryId);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    if (window.confirm('Are you sure you want to remove this widget?')) {
      dispatch({ type: 'REMOVE_WIDGET', categoryId, widgetId });
      console.log('Widget removed:', widgetId, 'from category:', categoryId);
    }
  };

  const handleToggleWidget = (categoryId, widgetId) => {
    handleRemoveWidget(categoryId, widgetId);
  };

  const handleResetDashboard = () => {
    if (window.confirm('Are you sure you want to reset the dashboard to default state? This will remove all custom widgets.')) {
      dispatch({ type: 'RESET_DASHBOARD' });
      console.log('Dashboard reset to initial state');
    }
  };

  // Modal management
  const openAddModal = (categoryId) => {
    const category = dashboardState.categories[categoryId];
    setSelectedCategory(categoryId);
    setSelectedCategoryName(category.name);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedCategory('');
    setSelectedCategoryName('');
  };

  // Calculate dashboard stats
  const totalWidgets = Object.values(dashboardState.categories).reduce(
    (total, category) => total + Object.keys(category.widgets).length, 0
  );

  const totalCategories = Object.keys(dashboardState.categories).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                {totalWidgets} widgets across {totalCategories} categories • 
                Last updated: {new Date(dashboardState.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsManageModalOpen(true)}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                <Settings size={16} />
                Manage Widgets
              </button>
              
              <button
                onClick={handleResetDashboard}
                className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="p-6">
        {Object.values(dashboardState.categories).map(category => {
          const widgetCount = Object.keys(category.widgets).length;
          
          return (
            <section key={category.id} className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {widgetCount} widget{widgetCount !== 1 ? 's' : ''} in this category
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Existing Widgets */}
                {Object.values(category.widgets).map(widget => (
                  <Widget
                    key={widget.id}
                    widget={widget}
                    categoryId={category.id}
                    onRemove={handleRemoveWidget}
                  />
                ))}
                
                {/* Add Widget Button */}
                <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 h-72 flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer group">
                  <button
                    onClick={() => openAddModal(category.id)}
                    className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-gray-700 transition-colors"
                  >
                    <div className="bg-gray-100 group-hover:bg-gray-200 p-4 rounded-full transition-colors">
                      <Plus size={24} />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Add Widget</p>
                      <p className="text-sm text-gray-400">Click to create new widget</p>
                    </div>
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* Modals */}
      <AddWidgetModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        categoryId={selectedCategory}
        categoryName={selectedCategoryName}
        onAdd={handleAddWidget}
      />

      <WidgetManagementModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        dashboardData={dashboardState}
        onToggleWidget={handleToggleWidget}
      />
    </div>
  );
};

export default DynamicDashboard;