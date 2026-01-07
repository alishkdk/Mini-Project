'use client'
import React, { useState } from 'react'
import { Calculator as CalcIcon, Delete, Menu, Clock, Maximize2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Calculator = () => {


    const router=useRouter()

  const [answer, setAnswer] = useState('0')
  const [expression, setExpression] = useState('')
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const calcKeys = [
    ['%', 'CE', 'C', '⌫'],
    ['1/x', 'x²', '²√x', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ]

  const operators = ['÷', '×', '-', '+']
  const nonNumbers = [...operators, '=', 'C', 'CE', '⌫', '%', '1/x', 'x²', '²√x']

  const calculate = (key) => {
    // Handle Clear All
    if (key === 'C') {
      setAnswer('0')
      setExpression('')
      setShouldResetDisplay(false)
      return
    }

    // Handle Clear Entry
    if (key === 'CE') {
      setAnswer('0')
      setShouldResetDisplay(false)
      return
    }

    // Handle Backspace
    if (key === '⌫') {
      if (answer.length === 1 || answer === '0') {
        setAnswer('0')
      } else {
        setAnswer(answer.slice(0, -1))
      }
      return
    }

    // Handle special operations
    if (key === '1/x') {
      const num = parseFloat(answer)
      setAnswer((1 / num).toString())
      setShouldResetDisplay(true)
      return
    }

    if (key === 'x²') {
      const num = parseFloat(answer)
      setAnswer((num * num).toString())
      setShouldResetDisplay(true)
      return
    }

    if (key === '²√x') {
      const num = parseFloat(answer)
      setAnswer(Math.sqrt(num).toString())
      setShouldResetDisplay(true)
      return
    }

    if (key === '%') {
      const num = parseFloat(answer)
      setAnswer((num / 100).toString())
      setShouldResetDisplay(true)
      return
    }

    if (key === '+/-') {
      if (answer === '0') return
      setAnswer((parseFloat(answer) * -1).toString())
      return
    }

    // Handle operators - don't allow consecutive operators
    if (operators.includes(key)) {
      if (expression && !expression.endsWith(' ')) {
        // If there's an expression, evaluate it first
        try {
          const evalExpr = expression.replace(/×/g, '*').replace(/÷/g, '/')
          const result = eval(evalExpr + answer)
          setAnswer(result.toString())
          setExpression(result + ' ' + key + ' ')
          setShouldResetDisplay(true)
        } catch (error) {
          setAnswer('Error')
        }
      } else if (!expression.endsWith(' ')) {
        // Start new expression
        setExpression(answer + ' ' + key + ' ')
        setShouldResetDisplay(true)
      }
      return
    }

    // Handle equals
    if (key === '=') {
      if (expression) {
        try {
          const evalExpr = expression.replace(/×/g, '*').replace(/÷/g, '/')
          const result = eval(evalExpr + answer)
          setAnswer(result.toString())
          setExpression('')
          setShouldResetDisplay(true)
        } catch (error) {
          setAnswer('Error')
        }
      }
      return
    }

    // Handle numbers and decimal point
    if (shouldResetDisplay && !operators.includes(key)) {
      setAnswer(key === '.' ? '0.' : key)
      setShouldResetDisplay(false)
      return
    }

    if (key === '.') {
      if (!answer.includes('.')) {
        setAnswer(answer + '.')
      }
      return
    }

    // Handle regular numbers
    if (answer === '0') {
      setAnswer(key)
    } else {
      setAnswer(answer + key)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
           <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
        {/* Calculator Window */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
          
          {/* Title Bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          
            <div className="flex items-center gap-3">
              <CalcIcon className="w-5 h-5 text-gray-700" />
              <span className="font-semibold text-gray-800">Calculator</span>
            </div>
          </div>

          {/* Display */}
          <div className="bg-white px-6 py-8">
            {expression && (
              <div className="text-gray-500 text-right text-sm mb-2 h-6">
                {expression}
              </div>
            )}
            <div className="text-right">
              <div className="text-5xl font-light text-gray-900 break-all">
                {answer}
              </div>
            </div>
          </div>

          {/* Memory Buttons */}
          <div className="bg-white px-4 pb-4">
            <div className="grid grid-cols-6 gap-1">
              {['MC', 'MR', 'M+', 'M-', 'MS', 'M∨'].map((btn) => (
                <button
                  key={btn}
                  className="text-xs text-gray-600 hover:bg-gray-100 py-2 rounded font-medium"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-gray-50 px-2 pb-2">
            {calcKeys.map((row, id) => (
              <div className="grid grid-cols-4 gap-1 mb-1" key={id}>
                {row.map((key, keyId) => {
                  const isOperator = operators.includes(key)
                  const isEquals = key === '='
                  const isSpecial = ['C', 'CE', '⌫'].includes(key)
                  const isFunction = ['%', '1/x', 'x²', '²√x'].includes(key)

                  return (
                    <button
                      onClick={() => calculate(key)}
                      className={`
                        h-14 rounded font-medium text-base
                        transition-all duration-100
                        ${isEquals 
                          ? 'bg-teal-600 hover:bg-teal-700 text-white font-semibold' 
                          : isOperator
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                          : isSpecial || isFunction
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                          : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'
                        }
                      `}
                      key={keyId}
                    >
                      {key === '⌫' ? <Delete className="w-4 h-4 mx-auto" /> : key}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator