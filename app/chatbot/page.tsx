

          {/* Chat Interface */}
          <div className="space-y-4">
          {messages.map((message) => (
  <div
    key={message.id}
    className={`flex gap-3 ${
      message.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {message.sender === "bot" && (
      <Avatar className="w-8 h-8 border-2 border-pink-200">
        <AvatarImage src="/api/placeholder/32/32?text=C" />
        <AvatarFallback className="bg-pink-500 text-white text-xs">
          C
        </AvatarFallback>
      </Avatar>
    )}

    <div
      className={`max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl ${
        message.sender === "user"
          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white ml-auto"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {message.isLoading ? (
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <span className="text-sm">Chansey AI is typing...</span>
        </div>
      ) : (
        <div className="space-y-4">
<div className="prose prose-pink ">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.text}
  </ReactMarkdown>
</div>
          <div className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      )}
    </div>

    {message.sender === "user" && (
      <Avatar className="w-8 h-8 border-2 border-pink-200">
        <AvatarImage src="/api/placeholder/32/32?text=U" />
        <AvatarFallback className="bg-pink-500 text-white text-xs">
          U
        </AvatarFallback>
      </Avatar>
    )}
  </div>
))}
</div>

                          {/* Quick Questions */}
          <div className="mt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(question)}
                  className="text-xs border-pink-200 text-pink-700 hover:bg-pink-50 bg-transparent"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
              {/* Input Area */}
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your skin concern..."
                    className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • Your conversations are private and secure
                </div>
              </div>

        


          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-600">Advanced AI technology for accurate skin care information</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Safe & Secure</h3>
                <p className="text-sm text-gray-600">Your privacy and data security are our top priority</p>
              </CardContent>
            </Card>

            <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-gray-600">AI assistant only - consult professionals for serious conditions</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Features Section */}
          <div className="mt-8">
            <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-800">Why Choose Chansey AI?</CardTitle>
                <CardDescription className="text-base">Experience the future of dermatological assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Instant Responses</h4>
                        <p className="text-sm text-gray-600">Get immediate answers to your skin care questions without waiting</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Personalized Care</h4>
                        <p className="text-sm text-gray-600">Tailored recommendations based on your specific skin concerns</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Privacy First</h4>
                        <p className="text-sm text-gray-600">Your conversations are completely private and secure</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Always Learning</h4>
                        <p className="text-sm text-gray-600">Continuously updated with the latest dermatological research</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      

      {/* Floating Chansey AI Button */}
      {/* <ChanseyFAB /> */}
      <Toaster />
    </div>
  )
}
