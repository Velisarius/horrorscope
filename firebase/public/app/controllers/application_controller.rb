class ApplicationController < ActionController::Base
  def send_notification
    client = Exponent::Push::Client.new
    messages = [{
                    to: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
                    sound: "default",
                    body: "Hello world!"
                }]

    client.publish messages

  end
end
