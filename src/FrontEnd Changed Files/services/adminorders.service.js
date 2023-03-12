import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader, authImageHeader } from './base.service';

const ADMIN_API_URL = BASE_API_URL + '/order/admin';

class OrderService {
  
  getAllOrders() {
    return axios.get(ADMIN_API_URL , { headers: authHeader() })
  }

  updateOrderStatus(orderStatusDTO){
    return axios.put(ADMIN_API_URL , orderStatusDTO , { headers: authHeader() })
  }

}

export default new OrderService();