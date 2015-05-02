require 'bundler'
Bundler.require()

get '/' do
  erb :index
end

get '/templatefun' do
  erb :head
end
