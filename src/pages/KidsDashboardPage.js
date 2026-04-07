import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for the kids dashboard
const mockKidsFunds = [
  {
    id: 'fund1',
    name: 'Toy Savings Club',
    goal: 500,
    saved: 300,
    members: ['Timmy', 'Sarah', 'Alex', 'Emma'],
    contributions: [
      { week: 1, amount: 50 },
      { week: 2, amount: 50 },
      { week: 3, amount: 50 },
      { week: 4, amount: 50 },
      { week: 5, amount: 50 },
      { week: 6, amount: 50 }
    ],
    nextContribution: '2023-09-15',
    image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png'
  },
  {
    id: 'fund2',
    name: 'Birthday Party Fund',
    goal: 300,
    saved: 150,
    members: ['Timmy', 'Sarah', 'Emma'],
    contributions: [
      { week: 1, amount: 30 },
      { week: 2, amount: 30 },
      { week: 3, amount: 30 },
      { week: 4, amount: 30 },
      { week: 5, amount: 30 }
    ],
    nextContribution: '2023-09-20',
    image: 'https://cdn-icons-png.flaticon.com/512/3093/3093309.png'
  }
];

// Mock friends data
const mockFriends = [
  { id: 1, name: 'Sarah', avatar: '👧', savings: 450 },
  { id: 2, name: 'Alex', avatar: '👦', savings: 380 },
  { id: 3, name: 'Emma', avatar: '👧', savings: 520 },
  { id: 4, name: 'Jake', avatar: '👦', savings: 290 }
];

const KidsDashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [funds, setFunds] = useState(mockKidsFunds);
  const [selectedFund, setSelectedFund] = useState(mockKidsFunds[0]);
  const [friends, setFriends] = useState(mockFriends);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAddCoins, setShowAddCoins] = useState(false);
  const [coinsToAdd, setCoinsToAdd] = useState(10);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('chittyFundUser');
    if (!storedUser) {
      navigate('/kids-login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('chittyFundUser');
    navigate('/kids-login');
  };
  
  const handleFundSelect = (fundId) => {
    const fund = funds.find(f => f.id === fundId);
    if (fund) {
      setSelectedFund(fund);
    }
  };
  
  const handleAddCoins = () => {
    // Update the selected fund with new coins
    const updatedFunds = funds.map(fund => {
      if (fund.id === selectedFund.id) {
        return {
          ...fund,
          saved: fund.saved + coinsToAdd,
          contributions: [
            ...fund.contributions,
            { week: fund.contributions.length + 1, amount: coinsToAdd }
          ]
        };
      }
      return fund;
    });
    
    setFunds(updatedFunds);
    setSelectedFund(updatedFunds.find(f => f.id === selectedFund.id));
    setShowAddCoins(false);
    setCoinsToAdd(10);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="animate-bounce bg-white p-6 rounded-full shadow-lg">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2829/2829832.png" 
              alt="ChittyFund Logo" 
              className="w-12 h-12 mr-3"
            />
            <h1 className="text-2xl font-bold">ChittyFund</h1>
          </div>
          
          <div className="flex items-center">
            <div className="mr-4">
              <p className="text-sm">Hello, <span className="font-bold">{user.name}</span>!</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* What is ChittyFund explanation button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-full inline-flex items-center shadow-lg transform transition-transform hover:scale-105"
          >
            <span className="mr-2 text-2xl">❓</span>
            <span>What is ChittyFund?</span>
          </button>
        </div>
        
        {/* Explanation modal */}
        {showExplanation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative">
              <button 
                onClick={() => setShowExplanation(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-3xl font-bold text-purple-600 mb-4">What is ChittyFund?</h2>
              
              <div className="mb-6">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2037/2037506.png" 
                  alt="Friends saving together" 
                  className="w-32 h-32 mx-auto mb-4"
                />
                
                <p className="text-lg mb-4">
                  ChittyFund is a special way to save money with your friends! It's like a piggy bank that everyone puts coins into.
                </p>
                
                <div className="bg-blue-100 rounded-xl p-4 mb-4">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">How it works:</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>You and your friends decide to save for something special, like toys or a party.</li>
                    <li>Everyone puts the same number of coins in the fund each week.</li>
                    <li>When it's your turn, you get to use all the coins that everyone saved!</li>
                    <li>Then you keep adding coins until everyone gets a turn.</li>
                  </ol>
                </div>
                
                <div className="bg-green-100 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-green-700 mb-2">Why it's awesome:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You learn to save money instead of spending it right away.</li>
                    <li>You can buy bigger things that cost more coins.</li>
                    <li>You help your friends, and they help you too!</li>
                    <li>It's fun to watch your savings grow together.</li>
                  </ul>
                </div>
              </div>
              
              <button
                onClick={() => setShowExplanation(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full w-full"
              >
                I understand now!
              </button>
            </div>
          </div>
        )}
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Fund selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">My Saving Clubs</h2>
              </div>
              
              <div className="p-4">
                {funds.map((fund) => (
                  <button
                    key={fund.id}
                    onClick={() => handleFundSelect(fund.id)}
                    className={`w-full text-left mb-4 p-4 rounded-2xl transition-all ${
                      selectedFund.id === fund.id
                        ? 'bg-purple-100 border-2 border-purple-300'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <img src={fund.image} alt={fund.name} className="w-12 h-12 mr-4" />
                      <div>
                        <h3 className="font-bold text-gray-800">{fund.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-300 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: `${(fund.saved / fund.goal) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round((fund.saved / fund.goal) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
                
                <button className="w-full py-3 px-4 bg-blue-100 text-blue-600 rounded-2xl font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Start a New Saving Club
                </button>
              </div>
            </div>
            
            {/* Friends leaderboard */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Friends Leaderboard</h2>
              </div>
              
              <div className="p-4">
                {friends.sort((a, b) => b.savings - a.savings).map((friend, index) => (
                  <div 
                    key={friend.id}
                    className="flex items-center justify-between p-3 rounded-xl mb-2"
                    style={{
                      backgroundColor: index === 0 ? 'rgba(255, 215, 0, 0.2)' : 
                                      index === 1 ? 'rgba(192, 192, 192, 0.2)' : 
                                      index === 2 ? 'rgba(205, 127, 50, 0.2)' : 'rgba(240, 240, 240, 0.5)'
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center mr-3 text-2xl">
                        {friend.avatar}
                      </div>
                      <span className="font-medium">{friend.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-green-600">₹{friend.savings}</span>
                      {index === 0 && <span className="ml-2 text-2xl">🏆</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Selected fund details */}
          <div className="lg:col-span-2">
            {selectedFund && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">{selectedFund.name}</h2>
                  <button
                    onClick={() => setShowAddCoins(true)}
                    className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    Add Coins
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Fund progress */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Saved so far:</span>
                      <span className="font-bold text-gray-800">₹{selectedFund.saved} of ₹{selectedFund.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                        style={{ width: `${(selectedFund.saved / selectedFund.goal) * 100}%` }}
                      >
                        {Math.round((selectedFund.saved / selectedFund.goal) * 100)}%
                      </div>
                    </div>
                    
                    {/* Visual representation */}
                    <div className="bg-blue-50 rounded-2xl p-4 mt-4">
                      <h3 className="text-lg font-bold text-blue-800 mb-3">Your Savings Journey</h3>
                      <div className="flex items-end h-32 space-x-1">
                        {selectedFund.contributions.map((contribution, index) => (
                          <div 
                            key={index} 
                            className="flex-1 bg-blue-500 rounded-t-lg relative group"
                            style={{ height: `${(contribution.amount / selectedFund.goal) * 100 * 3}%` }}
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-blue-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Week {contribution.week}: ₹{contribution.amount}
                            </div>
                          </div>
                        ))}
                        {/* Empty spaces for future contributions */}
                        {Array.from({ length: selectedFund.goal / 50 - selectedFund.contributions.length }).map((_, index) => (
                          <div 
                            key={`empty-${index}`} 
                            className="flex-1 bg-gray-200 rounded-t-lg"
                            style={{ height: '10%' }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">Start</span>
                        <span className="text-sm text-gray-600">Finish</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fund details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <h3 className="text-lg font-bold text-purple-800 mb-3">Club Members</h3>
                      <div className="flex flex-wrap">
                        {selectedFund.members.map((member, index) => (
                          <div key={index} className="bg-white rounded-full px-3 py-1 text-sm font-medium text-purple-600 mr-2 mb-2">
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-2xl p-4">
                      <h3 className="text-lg font-bold text-green-800 mb-3">Next Contribution</h3>
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Next contribution date:</p>
                          <p className="text-xl font-bold text-gray-800">
                            {new Date(selectedFund.nextContribution).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fun facts */}
                  <div className="bg-yellow-50 rounded-2xl p-4">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3">Fun Facts</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-xl mr-2">🌟</span>
                        <span>If you save ₹{selectedFund.goal / selectedFund.members.length} in this club, you'll get ₹{selectedFund.goal} when it's your turn!</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-xl mr-2">🎯</span>
                        <span>You're {Math.round((selectedFund.saved / selectedFund.goal) * 100)}% of the way to your goal!</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-xl mr-2">👫</span>
                        <span>You're saving with {selectedFund.members.length - 1} friends in this club.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Add coins modal */}
      {showAddCoins && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Add Coins to Your Fund</h2>
            
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full mb-4">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2933/2933116.png" 
                  alt="Coins" 
                  className="w-16 h-16"
                />
              </div>
              
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => setCoinsToAdd(Math.max(5, coinsToAdd - 5))}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
                >
                  -
                </button>
                <div className="mx-4 text-3xl font-bold text-yellow-600">₹{coinsToAdd}</div>
                <button 
                  onClick={() => setCoinsToAdd(coinsToAdd + 5)}
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddCoins(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCoins}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full"
              >
                Add Coins
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-white py-6 text-center">
        <p className="text-gray-600">© 2023 ChittyFund - Learning about saving is fun!</p>
      </footer>
    </div>
  );
};

export default KidsDashboardPage;
