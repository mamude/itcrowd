module JwtAuthorization

  def secret_key
    ENV['JWT_SECRET']
  end

  def auth_header
    request.headers['Authorization']
  end

  def encode_token(payload)
    JWT.encode(payload, secret_key)
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, secret_key, true, algorithm: 'HS256')
      rescue => exception
        nil
      end
    end
  end

  def logged_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      username = decoded_token[0]['username']
      @user = User.find_by(id: user_id, username: username)
    end
  end

  def is_logged?
    !!logged_user
  end

  def is_authenticaded
    render json: { message: 'Please log in!'}, status: :unauthorized unless is_logged?
  end
end
