import http from "./config";

class CrudService {
    async getData(path) {
        return await http.get(path);

    }
    async postData(path, data) {
        // console.log(path, data);
        return await http.post(path, data);

    }
    async deleteData(path) {
        return await http.delete(path);
    }
    async updateData(path, data) {
        return await http.put(path, data);
    }
}

var obj_crud = new CrudService();
export default obj_crud;