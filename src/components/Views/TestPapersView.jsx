import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Search, Filter, Calendar, BookOpen, X, Eye } from 'lucide-react'
import FlippingBookViewer from '../UI/FlippingBookViewer'

function TestPapersView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  
  const subjects = [
    { id: 'all', name: 'All Subjects', nepaliName: 'सबै विषयहरू' },
    { id: 'maths', name: 'Mathematics', nepaliName: 'गणित' },
    { id: 'general', name: 'General Knowledge', nepaliName: 'सामान्य ज्ञान' },
    { id: 'english', name: 'English', nepaliName: 'अंग्रेजी' }
  ]
  
  const testPapers = [
    {
      id: 'ri20-mock-maths',
      title: 'RI20 Mock Mathematics Questions',
      nepaliTitle: 'RI20 मॉक गणित प्रश्नहरू',
      subject: 'maths',
      type: 'mock',
      year: '2019',
      description: 'Mock mathematics questions for RI20 preparation',
      filename: '20190807-ri20_rs_gcspf_mock_up_maths_qs.pdf',
      url: '/gurkha-preparation-tracker/test-papers/20190807-ri20_rs_gcspf_mock_up_maths_qs.pdf'
    },
    {
      id: 'education-info',
      title: 'Website Education Information',
      nepaliTitle: 'वेबसाइट शिक्षा जानकारी',
      subject: 'general',
      type: 'info',
      year: '2024',
      description: 'Educational information and guidelines from official website',
      filename: '20240423-website_education_info.pdf',
      url: '/gurkha-preparation-tracker/test-papers/20240423-website_education_info.pdf'
    },
    {
      id: 'ba-example-papers',
      title: 'BA Example Papers - Samples',
      nepaliTitle: 'BA उदाहरण कागजातहरू - नमूनाहरू',
      subject: 'maths',
      type: 'sample',
      year: '2025',
      description: 'Sample BA mathematics papers for practice',
      filename: '20250325-ba-example_papers-samples.pdf',
      url: '/gurkha-preparation-tracker/test-papers/20250325-ba-example_papers-samples.pdf'
    },
    {
      id: 'ba-maths-assessment',
      title: 'BA Mathematics Assessment Paper',
      nepaliTitle: 'BA गणित मूल्याङ्कन कागजात',
      subject: 'maths',
      type: 'assessment',
      year: '2025',
      description: 'Official BA mathematics assessment paper',
      filename: 'ba-maths-assessment-paper.pdf',
      url: '/gurkha-preparation-tracker/test-papers/ba-maths-assessment-paper.pdf'
    },
    {
      id: 'ba-phase1-maths',
      title: 'BA Phase 1 Mathematics Set',
      nepaliTitle: 'BA चरण 1 गणित सेट',
      subject: 'maths',
      type: 'phase1',
      year: '2025',
      description: 'Phase 1 mathematics questions for BA preparation',
      filename: 'ba-phase-1-mathematics-set_compress.pdf',
      url: '/gurkha-preparation-tracker/test-papers/ba-phase-1-mathematics-set_compress.pdf'
    },
    {
      id: 'ba-phase1-maths-2081',
      title: 'BA Phase 1 Mathematics 2081',
      nepaliTitle: 'BA चरण 1 गणित २०८१',
      subject: 'maths',
      type: 'phase1',
      year: '2025',
      description: 'Phase 1 mathematics questions from 2081 batch',
      filename: 'ilide.info-ba-phase-1-mathematics-2081-03-06-pr_82349952ae143b8fdada9003840d042e.pdf',
      url: '/gurkha-preparation-tracker/test-papers/ilide.info-ba-phase-1-mathematics-2081-03-06-pr_82349952ae143b8fdada9003840d042e.pdf'
    }
  ]
  
  const filteredPapers = testPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.nepaliTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject
    return matchesSearch && matchesSubject
  })
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'mock': return 'text-yellow-400 bg-yellow-400/20'
      case 'sample': return 'text-blue-400 bg-blue-400/20'
      case 'assessment': return 'text-red-400 bg-red-400/20'
      case 'phase1': return 'text-green-400 bg-green-400/20'
      case 'info': return 'text-purple-400 bg-purple-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }
  
  const getTypeLabel = (type) => {
    switch (type) {
      case 'mock': return 'Mock Test'
      case 'sample': return 'Sample Paper'
      case 'assessment': return 'Assessment'
      case 'phase1': return 'Phase 1'
      case 'info': return 'Information'
      default: return 'Test Paper'
    }
  }
  
  const handleView = (paper) => {
    setSelectedPaper(paper)
    setShowPdfViewer(true)
  }
  
  const handleDownload = (paper) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = paper.url
    link.download = paper.filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  const closePdfViewer = () => {
    setShowPdfViewer(false)
    setSelectedPaper(null)
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
          <h1 className="text-white text-3xl font-bold mb-2">Test Papers</h1>
          <p className="text-gray-300">Practice papers and assessments for your Gurkha preparation</p>
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
                placeholder="Search test papers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-navy-500"
              />
            </div>
            
            {/* Subject Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    selectedSubject === subject.id
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Test Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/15 transition-all duration-300"
            >
              {/* Paper Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-800 text-red-400">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm leading-tight">{paper.title}</h3>
                    <p className="text-gray-400 text-xs">{paper.nepaliTitle}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(paper.type)}`}>
                  {getTypeLabel(paper.type)}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {paper.description}
              </p>
              
              {/* Year and Subject */}
              <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} />
                  <span>{paper.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen size={14} />
                  <span className="capitalize">{paper.subject}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleView(paper)}
                  className="flex-1 py-2 bg-navy-600 hover:bg-navy-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleDownload(paper)}
                  className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* No Results */}
        {filteredPapers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">No test papers found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
        
        {/* Study Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-white font-semibold text-xl mb-4">Study Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-navy-400 font-semibold mb-2">How to Use These Papers</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with sample papers to understand the format</li>
                <li>• Time yourself while solving mock tests</li>
                <li>• Review your mistakes and weak areas</li>
                <li>• Practice regularly for better performance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-navy-400 font-semibold mb-2">Preparation Strategy</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Focus on mathematics fundamentals</li>
                <li>• Practice mental calculations daily</li>
                <li>• Work on speed and accuracy</li>
                <li>• Take regular breaks during study</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Flipping Book PDF Viewer */}
      <FlippingBookViewer
        isOpen={showPdfViewer}
        onClose={closePdfViewer}
        pdfUrl={selectedPaper?.url}
        title={selectedPaper?.title}
        nepaliTitle={selectedPaper?.nepaliTitle}
      />
    </div>
  )
}

export default TestPapersView