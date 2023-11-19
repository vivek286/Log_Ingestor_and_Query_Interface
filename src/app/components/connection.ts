import elasticsearch from '@elastic/elasticsearch'

export default function (){
    var client = new elasticsearch.Client({
        host: "http://localhost:9200",
        requestTimeout: Infinity, // Tested
        keepAlive: true // Tested
    });
    

    return client;
}