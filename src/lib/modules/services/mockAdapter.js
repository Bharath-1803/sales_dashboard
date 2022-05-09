import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Setting the mock adapter on the default instance

const mockAdapterInstance = new MockAdapter(axios);

export default mockAdapterInstance;
