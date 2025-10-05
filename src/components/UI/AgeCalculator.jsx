import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, XCircle, Calculator } from 'lucide-react'

// Simple BS to AD conversion (approximate)
const bsToAd = (bsDate) => {
  const [year, month, day] = bsDate.split('-').map(Number)
  // BS starts around 57 years ahead of AD
  const adYear = year - 57
  // Approximate month conversion (BS months are slightly different)
  const adMonth = month
  const adDay = day
  
  // Handle year boundary
  if (adYear < 0) {
    return `${adYear + 1}-${adMonth.toString().padStart(2, '0')}-${adDay.toString().padStart(2, '0')}`
  }
  
  return `${adYear}-${adMonth.toString().padStart(2, '0')}-${adDay.toString().padStart(2, '0')}`
}

// Simple AD to BS conversion (approximate)
const adToBs = (adDate) => {
  const [year, month, day] = adDate.split('-').map(Number)
  // AD to BS conversion
  const bsYear = year + 57
  const bsMonth = month
  const bsDay = day
  
  return `${bsYear}-${bsMonth.toString().padStart(2, '0')}-${bsDay.toString().padStart(2, '0')}`
}

// Calculate age in years, months, and days using dayjs logic
const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()
  
  // Fix negative month logic
  if (months < 0) {
    years -= 1
    months += 12
  }
  
  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }
  
  return { years, months, days }
}

// Check Gurkha eligibility (18+ years)
const checkEligibility = (age) => {
  const eligibleAge = 18
  if (age.years >= eligibleAge) {
    return "✅ You are eligible to apply for British Gurkha selection!"
  } else {
    const remainingYears = eligibleAge - age.years - 1 >= 0 ? eligibleAge - age.years - 1 : 0
    const remainingMonths = 12 - age.months
    return `⏳ Eligible in ${remainingYears} years, ${remainingMonths} months`
  }
}

function AgeCalculator() {
  const [calendar, setCalendar] = useState('BS')
  const [date, setDate] = useState('')
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    if (!date) {
      setResult({ error: '❌ Please enter a valid date (YYYY-MM-DD).' })
      return
    }

    setIsCalculating(true)
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        let adDate, bsDate
        
        if (calendar === 'BS') {
          bsDate = date
          adDate = bsToAd(date)
        } else {
          adDate = date
          bsDate = adToBs(date)
        }

        const age = calculateAge(adDate)
        const eligibilityStatus = checkEligibility(age)
        
        setResult({
          bsDate,
          adDate,
          age: `${age.years} years, ${age.months} months, ${age.days} days`,
          eligibilityStatus
        })
      } catch (error) {
        setResult({ error: '❌ Invalid date or conversion error.' })
      } finally {
        setIsCalculating(false)
      }
    }, 500)
  }

  const handleClear = () => {
    setDate('')
    setResult(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 glass-card"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-army-500 to-navy-500 rounded-2xl flex items-center justify-center mr-4">
            <Calculator className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Age Calculator</h2>
            <p className="text-gray-300">BS ⇄ AD Conversion & Gurkha Eligibility</p>
          </div>
        </div>
      </div>

      {/* Calendar Selection */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-3 text-center">
          Select Calendar Type
        </label>
        <div className="flex justify-center space-x-6">
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              calendar === 'BS'
                ? 'bg-army-500/50 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <input
              type="radio"
              name="calendar"
              value="BS"
              checked={calendar === 'BS'}
              onChange={() => setCalendar('BS')}
              className="sr-only"
            />
            <Calendar size={20} />
            <span className="font-medium">Bikram Sambat (BS)</span>
          </motion.label>
          
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              calendar === 'AD'
                ? 'bg-navy-500/50 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <input
              type="radio"
              name="calendar"
              value="AD"
              checked={calendar === 'AD'}
              onChange={() => setCalendar('AD')}
              className="sr-only"
            />
            <Calendar size={20} />
            <span className="font-medium">Gregorian (AD)</span>
          </motion.label>
        </div>
      </div>

      {/* Date Input */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-3 text-center">
          Enter Date of Birth
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder={`Enter ${calendar} date (YYYY-MM-DD)`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-army-400 focus:border-transparent text-center text-lg"
          />
          <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <p className="text-gray-400 text-sm text-center mt-2">
          {calendar === 'BS' 
            ? 'Enter date in Bikram Sambat format (e.g., 2069-08-12)'
            : 'Enter date in Gregorian format (e.g., 2012-08-27)'
          }
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCalculate}
          disabled={isCalculating}
          className="flex-1 bg-gradient-to-r from-army-500 to-navy-500 hover:from-army-600 hover:to-navy-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <Calculator size={20} />
              <span>Calculate Age</span>
            </>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClear}
          className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200"
        >
          Clear
        </motion.button>
      </div>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {result.error ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 text-center">
              <XCircle className="mx-auto mb-3 text-red-400" size={32} />
              <p className="text-red-300 font-semibold">{result.error}</p>
            </div>
          ) : (
            <>
              {/* Date Conversion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <h3 className="text-army-400 font-semibold mb-2 flex items-center justify-center">
                    <Calendar className="mr-2" size={20} />
                    Bikram Sambat
                  </h3>
                  <p className="text-white text-xl font-mono">{result.bsDate}</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6 text-center">
                  <h3 className="text-navy-400 font-semibold mb-2 flex items-center justify-center">
                    <Calendar className="mr-2" size={20} />
                    Gregorian
                  </h3>
                  <p className="text-white text-xl font-mono">{result.adDate}</p>
                </div>
              </div>

              {/* Age Display */}
              <div className="bg-gradient-to-r from-army-500/20 to-navy-500/20 rounded-xl p-6 text-center">
                <h3 className="text-white font-semibold mb-4 flex items-center justify-center">
                  <Clock className="mr-2" size={20} />
                  Current Age
                </h3>
                <div className="text-3xl font-bold text-white mb-2">
                  {result.age}
                </div>
                <div className="text-gray-300 text-sm">
                  Born on {calendar === 'BS' ? result.adDate : result.bsDate}
                </div>
              </div>

              {/* Eligibility Status */}
              <div className={`rounded-xl p-6 text-center ${
                result.eligibilityStatus.includes('✅') 
                  ? 'bg-green-500/20 border border-green-500/50' 
                  : 'bg-yellow-500/20 border border-yellow-500/50'
              }`}>
                <div className="flex items-center justify-center mb-3">
                  {result.eligibilityStatus.includes('✅') ? (
                    <CheckCircle className="text-green-400" size={32} />
                  ) : (
                    <Clock className="text-yellow-400" size={32} />
                  )}
                </div>
                <h3 className="text-white font-semibold mb-2">Gurkha Eligibility Status</h3>
                <p className={`text-lg font-semibold ${
                  result.eligibilityStatus.includes('✅') ? 'text-green-300' : 'text-yellow-300'
                }`}>
                  {result.eligibilityStatus}
                </p>
                {!result.eligibilityStatus.includes('✅') && (
                  <p className="text-gray-300 text-sm mt-2">
                    Keep training and stay motivated! 💪
                  </p>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>🇳🇵 Perfect for Gurkha preparation planning and eligibility checks</p>
        <p className="mt-1">Note: Date conversion is approximate. For official purposes, use certified conversion tools.</p>
      </div>
    </motion.div>
  )
}

export default AgeCalculator