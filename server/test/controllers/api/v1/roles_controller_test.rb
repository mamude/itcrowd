require 'test_helper'

class Api::V1::RolesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_roles_index_url
    assert_response :success
  end

end
