'use client'
import  { useEffect, useState } from 'react'
import Question from '../Question'
import { Brain, Crown, Rocket, Sparkles, Target, Timer, Trophy } from 'lucide-react'

const Quiz = () => {
    const[currentQuestion, SetCurrentQuestion]=useState(0)
    const[selectedAnswer,setSelectAnswer]=useState(null)
    const [result,setResult]=useState(false)
    const [score,setScore]=useState(0)
    const[quizStarted,setQuizStarted]=useState(false)
    const[timeLeft,setTimeLeft]=useState(15)
    const[isCorrect,setIsCorrect]=useState(null)

useEffect(()=>{
    if(quizStarted && !result && selectedAnswer === null && timeLeft>0){
        const timer =setTimeout(()=>setTimeLeft(timeLeft-1),1000)
        return() =>clearTimeout(timer)
    }
    if(timeLeft === 0 && selectedAnswer === null){
        handleAnswerClick(-1)
    }
},[timeLeft, quizStarted, result,selectedAnswer])

const handleAnswerClick = (index) => {
    if(selectedAnswer !== null) return

    setSelectAnswer(index)
    const selectedOption = Question[currentQuestion].options[index]
    const correct = selectedOption === Question[currentQuestion].answer
    setIsCorrect(correct)

    if(correct){
        setScore(score+1)
    }

    setTimeout(()=>{
        handleNext()
    },2000)
}

const handleNext =()=>{
    if(currentQuestion<Question.length -1){
        SetCurrentQuestion(currentQuestion +1 )
        setSelectAnswer(null)
        setTimeLeft(15)
        setIsCorrect(null)
    }
    else{
        setResult(true)
    }
}

const resetQuiz =()=>{
    SetCurrentQuestion(0)
    setSelectAnswer(null)
    setResult(false)
    setScore(0)
    setQuizStarted(false)
    setIsCorrect(null)
    setTimeLeft(15)
}

const startQuiz= ()=>{
setQuizStarted(true)
}

if(!quizStarted){
  return (
    <div className='min-h-screen bg-gray-200 p-8 flex items-center justify-center relative  overflow-hidden'>
   <div className="max-w-4xl w-full relative z-10">
    <div className='text-center mb-16'>
<div className='inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 rounded-full mb-8'>
<Sparkles className="w-5 h-5 text-yellow-300"/>
<span className='text-white  font-semibold'> Interactive Learning</span>
</div>
  <h1 className="text-7xl md:text-8xl font-black text-white mb-6 drop-shadow-lg">
              Brain<span className="text-yellow-300">Quest</span>
            </h1>
    </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{Question.length} Questions</h3>
              <p className="text-white/70">Carefully crafted challenges</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">15s Per Question</h3>
              <p className="text-white/70">Quick thinking required</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Track Progress</h3>
              <p className="text-white/70">See your improvement</p>
            </div>
          </div>
           <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-6 rounded-3xl text-2xl font-black hover:shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-4 group"
          >
            <Rocket className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            Start Your Quest
            <Sparkles className="w-8 h-8 group-hover:scale-125 transition-transform" />
          </button>
   </div>
   </div>
  )
}
if(result){
    const percentage = Math.round((score/Question.length)*100)
    let rank=""
    let rankcolor=""
    let rankIcon=null

    if(percentage === 100){
        rank="Genius"
        rankcolor="from-yellow-400 to-orange-500"
        rankIcon=<Crown className="w-16 h-16"/>

    } else if(percentage>= 80){
        rank="Expert"
        rankcolor = "from-purple-400 to-pink-500"
      rankIcon = <Brain className="w-16 h-16" />
    }
else if (percentage >= 60) {
      rank = "Scholar"
      rankcolor = "from-blue-400 to-cyan-500"
      rankIcon = <Target className="w-16 h-16" />
    } else {
      rank = "Learner"
      rankcolor = "from-green-400 to-emerald-500"
      rankIcon = <Sparkles className="w-16 h-16" />
    }
 
    return (
       <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 flex items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-3xl w-full relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20">
           <div className="text-center mb-8">
              <div className={`inline-block bg-gradient-to-br ${rankcolor} p-8 rounded-full mb-6 animate-bounce`}>
                {rankIcon}
              </div>
               <h1 className="text-6xl font-black text-white mb-4">Quest Complete!</h1>
              <div className={`inline-block bg-gradient-to-r ${rankcolor} px-8 py-3 rounded-full`}>
                <p className="text-2xl font-bold text-white">{rank} Rank Achieved!</p>
              </div>
              </div>

<div className=' bg-white/10 backdrop-blur-lg rounded-3xl p-10 mb-8 border border-white/20'>
  <div className='text-center'>
   <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4">
                  {percentage}%
                </div>
                <p className="text-3xl text-white font-bold mb-6">
                  {score} / {Question.length} Correct
                </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/70 text-sm mb-1">Accuracy</p>
                    <p className="text-3xl font-bold text-white">{percentage}%</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-white/70 text-sm mb-1">Total Score</p>
                    <p className="text-3xl font-bold text-white">{score}</p>
                  </div>
                </div>
  </div>
</div>
+   <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
              {percentage === 100 && (
                <p className="text-white text-center text-xl font-semibold">
                  🎉 Perfect Score! You're a true genius! 🧠✨
                </p>
              )}
              {percentage >= 80 && percentage < 100 && (
                <p className="text-white text-center text-xl font-semibold">
                  ⭐ Exceptional Work! Keep up the amazing performance! 💪
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-white text-center text-xl font-semibold">
                  👏 Great Job! You're on the right track! 🚀
                </p>
              )}
              {percentage < 60 && (
                <p className="text-white text-center text-xl font-semibold">
                  💪 Keep Learning! Every attempt makes you stronger! 📚
                </p>
              )}
            </div>
<button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-5 rounded-2xl text-xl font-black hover:shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
            >
              Take Another Quest
            </button>
              
          </div>
          </div>
       </div>
    )

}
return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-5xl mx-auto pt-8 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">BrainQuest</h2>
              <p className="text-white/70 text-sm">Level Up Your Mind</p>
            </div>
          </div>

      
            
            <div className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/30">
              <span className="text-white/70 text-sm">Score</span>
              <div className="text-3xl font-black text-white">{score}</div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-white/70" />
              <span className="text-white/70 font-semibold">Time Remaining</span>
            </div>
            <span className={`text-2xl font-black ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-lg">
            <div
              className={`h-3 transition-all duration-1000 ${timeLeft <= 5 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'}`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-semibold">Question {currentQuestion + 1} of {Question.length}</span>
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${
              Question[currentQuestion].difficulty === 'Easy' ? 'bg-green-500/30 text-green-200' : 'bg-orange-500/30 text-orange-200'
            }`}>
              {Question[currentQuestion].difficulty}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 h-2 transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / Question.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 mb-8">
          <div className="text-center mb-8">
            <div className="text-7xl mb-6">{Question[currentQuestion].emoji}</div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {Question[currentQuestion].question}
            </h2>
          </div>

          {/* Answer Grid */}
          <div className="grid gap-4">
            {Question[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = option === Question[currentQuestion].answer
              const showAnswer = selectedAnswer !== null

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 rounded-3xl text-left font-bold text-xl transition-all transform relative overflow-hidden
                    ${!showAnswer && 'bg-white/20 hover:bg-white/30 border-2 border-white/30 hover:scale-105'}
                    ${showAnswer && isSelected && isCorrectAnswer && 'bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-green-300 scale-105'}
                    ${showAnswer && isSelected && !isCorrectAnswer && 'bg-gradient-to-r from-red-500 to-pink-500 border-2 border-red-300'}
                    ${showAnswer && !isSelected && isCorrectAnswer && 'bg-gradient-to-r from-green-500/50 to-emerald-500/50 border-2 border-green-300/50'}
                    ${showAnswer && !isSelected && !isCorrectAnswer && 'bg-white/10 border-2 border-white/20 opacity-50'}
                    ${selectedAnswer === null && 'cursor-pointer hover:shadow-xl'}
                    ${selectedAnswer !== null && 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-white">{option}</span>
                    <div className="flex items-center gap-2">
                      {showAnswer && isCorrectAnswer && (
                        <div className="bg-white rounded-full p-2">
                          <span className="text-3xl">✓</span>
                        </div>
                      )}
                      {showAnswer && isSelected && !isCorrectAnswer && (
                        <div className="bg-white rounded-full p-2">
                          <span className="text-3xl">✗</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feedback Message */}
        {isCorrect !== null && (
          <div className={`text-center p-6 rounded-3xl font-bold text-2xl mb-8 animate-bounce ${
            isCorrect 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
          }`}>
            {isCorrect ? '🎉 Correct! Amazing!' : '💪 Not quite! Keep trying!'}
          </div>
        )}
      </div>
 
  )

}

export default Quiz