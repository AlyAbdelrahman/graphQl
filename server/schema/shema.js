const {clients,projects} = require('../sampleData');

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

//Client Type 
const ClientType = new GraphQLObjectType({
    name: 'client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});
const ProjectType = new GraphQLObjectType({
    name: 'project',
    fields: () => ({
        id: {type: GraphQLID},
        clientId: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return projects.find((project)=> project.id === args.id)
            } 
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent,args) {
                return projects;
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent,args) {
                return clients;
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return clients.find((client)=> client.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})