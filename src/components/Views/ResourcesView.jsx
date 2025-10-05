import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Download, ExternalLink, Play, Search, Filter, Eye, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

function ResourcesView() {
  const { milestones } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedResource, setSelectedResource] = useState(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  
  const categories = [
    { id: 'all', name: 'All Resources', nepaliName: 'सबै स्रोतहरू' },
    { id: 'study', name: 'Study Materials', nepaliName: 'अध्ययन सामग्री' },
    { id: 'test-papers', name: 'Test Papers', nepaliName: 'परीक्षा कागजातहरू' },
    { id: 'fitness', name: 'Fitness Guides', nepaliName: 'फिटनेस गाइडहरू' },
    { id: 'application', name: 'Application Process', nepaliName: 'आवेदन प्रक्रिया' },
    { id: 'inspiration', name: 'Success Stories', nepaliName: 'सफलता कथाहरू' }
  ]
  
  const allResources = [
    {
      id: 'see-guide',
      title: 'SEE Study Guide',
      nepaliTitle: 'SEE अध्ययन गाइड',
      category: 'study',
      type: 'pdf',
      description: 'Comprehensive guide for Secondary Education Examination preparation',
      url: '#',
      milestone: 'see'
    },
    {
      id: 'math-practice',
      title: 'Mathematics Practice Tests',
      nepaliTitle: 'गणित अभ्यास परीक्षणहरू',
      category: 'study',
      type: 'pdf',
      description: 'Practice tests and solutions for mathematics',
      url: '#',
      milestone: 'see'
    },
    {
      id: 'fitness-guide',
      title: 'Physical Training Guide',
      nepaliTitle: 'शारीरिक प्रशिक्षण गाइड',
      category: 'fitness',
      type: 'video',
      description: 'Complete fitness training program for Gurkha preparation',
      url: '#',
      milestone: 'training'
    },
    {
      id: 'running-techniques',
      title: 'Running Techniques',
      nepaliTitle: 'दौडने तकनीकहरू',
      category: 'fitness',
      type: 'video',
      description: 'Proper running form and endurance building',
      url: '#',
      milestone: 'training'
    },
    {
      id: 'application-guide',
      title: 'Application Process Guide',
      nepaliTitle: 'आवेदन प्रक्रिया गाइड',
      category: 'application',
      type: 'pdf',
      description: 'Step-by-step guide for Gurkha application process',
      url: '#',
      milestone: 'selection'
    },
    {
      id: 'success-story',
      title: 'Gurkha Success Stories',
      nepaliTitle: 'गोर्खा सफलता कथाहरू',
      category: 'inspiration',
      type: 'video',
      description: 'Inspiring stories from successful Gurkha soldiers',
      url: '#',
      milestone: 'selection'
    },
    {
      id: 'ri20-mock-maths',
      title: 'RI20 Mock Mathematics Questions',
      nepaliTitle: 'RI20 मॉक गणित प्रश्नहरू',
      category: 'test-papers',
      type: 'pdf',
      description: 'Mock mathematics questions for RI20 preparation',
      url: '/gurkha-preparation-tracker/test-papers/20190807-ri20_rs_gcspf_mock_up_maths_qs.pdf',
      milestone: 'see'
    },
    {
      id: 'ba-maths-assessment',
      title: 'BA Mathematics Assessment Paper',
      nepaliTitle: 'BA गणित मूल्याङ्कन कागजात',
      category: 'test-papers',
      type: 'pdf',
      description: 'Official BA mathematics assessment paper',
      url: '/gurkha-preparation-tracker/test-papers/ba-maths-assessment-paper.pdf',
      milestone: 'see'
    },
    {
      id: 'ba-phase1-maths',
      title: 'BA Phase 1 Mathematics Set',
      nepaliTitle: 'BA चरण 1 गणित सेट',
      category: 'test-papers',
      type: 'pdf',
      description: 'Phase 1 mathematics questions for BA preparation',
      url: '/gurkha-preparation-tracker/test-papers/ba-phase-1-mathematics-set_compress.pdf',
      milestone: 'see'
    }
  ]
  
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.nepaliTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf': return <Download size={18} />
      case 'video': return <Play size={18} />
      case 'link': return <ExternalLink size={18} />
      default: return <BookOpen size={18} />
    }
  }
  
  const getResourceColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-red-400'
      case 'video': return 'text-blue-400'
      case 'link': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }
  
  const handleView = (resource) => {
    if (resource.type === 'pdf') {
      setSelectedResource(resource)
      setShowPdfViewer(true)
    } else {
      window.open(resource.url, '_blank')
    }
  }
  
  const handleDownload = (resource) => {
    if (resource.type === 'pdf') {
      const link = document.createElement('a')
      link.href = resource.url
      link.download = resource.title + '.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(resource.url, '_blank')
    }
  }
  
  const closePdfViewer = () => {
    setShowPdfViewer(false)
    setSelectedResource(null)
  }
  
  return (
    <div className="h-screen w-full overflow-y-auto pt-20 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-white text-3xl font-bold mb-2">Resources</h1>
          <p className="text-gray-300">Study materials, guides, and inspiration for your journey</p>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 glass-card p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-navy-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
            >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-800 ${getResourceColor(resource.type)}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{resource.title}</h3>
                    <p className="text-gray-400 text-sm">{resource.nepaliTitle}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 uppercase">{resource.type}</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {resource.description}
              </p>
              
              {/* Milestone */}
              <div className="mb-4">
                <span className="text-xs text-gray-500 uppercase">Related to:</span>
                <div className="text-sm text-navy-400 font-medium mt-1">
                  {milestones.find(m => m.id === resource.milestone)?.name}
                </div>
              </div>
              
              {/* Action Button */}
              {resource.type === 'pdf' ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(resource)}
                    className="flex-1 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleView(resource)}
                  className="w-full py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {resource.type === 'video' && <Play size={16} />}
                  {resource.type === 'link' && <ExternalLink size={16} />}
                  <span>
                    {resource.type === 'video' && 'Watch'}
                    {resource.type === 'link' && 'Visit'}
                  </span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
        
        {/* Featured Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-xl mb-4">Featured Content</h3>
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Featured video will be embedded here</p>
              <p className="text-gray-500 text-sm mt-2">YouTube integration coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {showPdfViewer && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closePdfViewer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-6xl max-h-[90vh] glass-card p-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{selectedResource.title}</h3>
                  <p className="text-gray-300 text-sm">{selectedResource.nepaliTitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownload(selectedResource)}
                    className="px-3 py-1 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={closePdfViewer}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="flex-1 bg-white rounded-lg overflow-hidden">
                <iframe
                  src={`${selectedResource.url}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  title={selectedResource.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResourcesView