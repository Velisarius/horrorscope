class ApplicationController < ActionController::Base
  def send_notification
    # token = params[:token][:value]
    token = "ExponentPushToken[fH49RnJKzgic0zpfQpT1Nd]"
    client = Exponent::Push::Client.new
    messages = [{
                    to: token,
                    sound: "default",
                    body: "Hello world!"
                }]

    client.publish messages

  end
end
