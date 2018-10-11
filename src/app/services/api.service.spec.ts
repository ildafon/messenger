import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiService } from './api.service';

describe('Service: ApiService', () => {
  let service: ApiService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        },
        ApiService
      ]
    });
  });

  beforeEach(inject([ApiService, MockBackend], (apiService: ApiService, mockBackend: MockBackend) => {
    service = apiService;
    backend = mockBackend;
  }));

  const data = {
    'login': 'tomtt',
    'id': '31',
    'node_id': 'MDQ6VXNlcjMx',
    'avatar_url': 'https://avatars2.githubusercontent.com/u/31?v=4',
    'gravatar_id': '',
    'url': 'https://api.github.com/users/tomtt',
    'html_url': 'https://github.com/tomtt',
    'followers_url': 'https://api.github.com/users/tomtt/followers',
    'following_url': 'https://api.github.com/users/tomtt/following{/other_user}',
    'gists_url': 'https://api.github.com/users/tomtt/gists{/gist_id}',
    'starred_url': 'https://api.github.com/users/tomtt/starred{/owner}{/repo}',
    'subscriptions_url': 'https://api.github.com/users/tomtt/subscriptions',
    'organizations_url': 'https://api.github.com/users/tomtt/orgs',
    'repos_url': 'https://api.github.com/users/tomtt/repos',
    'events_url': 'https://api.github.com/users/tomtt/events{/privacy}',
    'received_events_url': 'https://api.github.com/users/tomtt/received_events',
    'type': 'User',
    'site_admin': false,
    'name': 'Tom ten Thij',
    'company': 'Freelance',
    'blog': 'tomtenthij.nl',
    'location': 'Amsterdam',
    'email': null,
    'hireable': true,
    'bio': null,
    'public_repos': '72',
    'public_gists': '240',
    'followers': '29',
    'following': '12',
    'created_at': '2008-01-15T15:44:31Z',
    'updated_at': '2018-10-02T09:20:09Z'
};

  const users = [
            {
              'login': 'tomtt',
              'id': '31',
              'node_id': 'MDQ6VXNlcjMx',
              'avatar_url': 'https://avatars2.githubusercontent.com/u/31?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/tomtt',
              'html_url': 'https://github.com/tomtt',
              'followers_url': 'https://api.github.com/users/tomtt/followers',
              'following_url': 'https://api.github.com/users/tomtt/following{/other_user}',
              'gists_url': 'https://api.github.com/users/tomtt/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/tomtt/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/tomtt/subscriptions',
              'organizations_url': 'https://api.github.com/users/tomtt/orgs',
              'repos_url': 'https://api.github.com/users/tomtt/repos',
              'events_url': 'https://api.github.com/users/tomtt/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/tomtt/received_events',
              'type': 'User',
              'site_admin': false
          },
          {
              'login': 'railsjitsu',
              'id': '32',
              'node_id': 'MDQ6VXNlcjMy',
              'avatar_url': 'https://avatars2.githubusercontent.com/u/32?v=4',
              'gravatar_id': '',
              'url': 'https://api.github.com/users/railsjitsu',
              'html_url': 'https://github.com/railsjitsu',
              'followers_url': 'https://api.github.com/users/railsjitsu/followers',
              'following_url': 'https://api.github.com/users/railsjitsu/following{/other_user}',
              'gists_url': 'https://api.github.com/users/railsjitsu/gists{/gist_id}',
              'starred_url': 'https://api.github.com/users/railsjitsu/starred{/owner}{/repo}',
              'subscriptions_url': 'https://api.github.com/users/railsjitsu/subscriptions',
              'organizations_url': 'https://api.github.com/users/railsjitsu/orgs',
              'repos_url': 'https://api.github.com/users/railsjitsu/repos',
              'events_url': 'https://api.github.com/users/railsjitsu/events{/privacy}',
              'received_events_url': 'https://api.github.com/users/railsjitsu/received_events',
              'type': 'User',
              'site_admin': false
          }
          ];

const id = 'tomtt';


  it('should call the fetch api and return the fetch results', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(users)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`http://localhost:4200/assets/github-users.json`);
    });

    service
      .fetchUsers()
      .subscribe((res) => {
        expect(res).toEqual(users);
        done();
      });
  });

  it('should retrieve the user by id', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(data)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`http://localhost:4200/assets/user-${id}.json`);
    });
    service
      .retrieveUser(id)
      .subscribe((response) => {
        expect(response).toEqual(data);
        done();
      });
  });

  describe('fetchMessages', () => {
    const messages = [
      {
        'id': '1001',
        'author': 'abhay',
        'text': ' შემორჩა, არამედ მან დღემდე, ელექტრონული ტიპოგრაფიის დრომდეც უცვლელად მოაღწია. განსაკუთრებული პოპულარობა მას',
        'conversation': 'abhay',
        'createdAt': '20-09-2018 12:20:34'
      },
      {
        'id': '1002',
        'author': 'ry',
        'text': 'იტყვებია ხოლმე. შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი შეუძლებელია. დღეს უამრავი პერსონალური საგამ',
        'conversation': 'abhay',
        'createdAt': '20-09-2018 12:20:35'
      }
    ];
    it('should call the fetch messages api and return the fetch results', (done) => {
      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify(messages)
        });
        connection.mockRespond(new Response(options));
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.url).toEqual(`http://localhost:4200/assets/messages.json`);
      });

      service
        .fetchMessages()
        .subscribe((res) => {
          expect(res).toEqual(messages);
          done();
        });
    });

  });

});
