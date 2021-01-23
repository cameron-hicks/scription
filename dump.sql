--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    _id integer NOT NULL,
    user_id integer NOT NULL,
    scription_id integer,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    text text NOT NULL
);



--
-- Name: comments__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments__id_seq OWNED BY public.comments._id;


--
-- Name: comments_scription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_scription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_scription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_scription_id_seq OWNED BY public.comments.scription_id;


--
-- Name: comments_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_user_id_seq OWNED BY public.comments.user_id;


--
-- Name: folders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.folders (
    _id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(30),
    private boolean DEFAULT false,
    color character(7)[]
);


--
-- Name: folders__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.folders__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: folders__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.folders__id_seq OWNED BY public.folders._id;


--
-- Name: folders_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.folders_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: folders_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.folders_user_id_seq OWNED BY public.folders.user_id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    _id integer NOT NULL,
    user_id integer NOT NULL,
    scription_id integer
);


--
-- Name: likes__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes__id_seq OWNED BY public.likes._id;


--
-- Name: likes_scription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_scription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_scription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_scription_id_seq OWNED BY public.likes.scription_id;


--
-- Name: likes_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_user_id_seq OWNED BY public.likes.user_id;


--
-- Name: scriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scriptions (
    _id integer NOT NULL,
    user_id integer NOT NULL,
    "timestamp" timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    song_id integer,
    abc text
);


--
-- Name: scriptions__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scriptions__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scriptions__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scriptions__id_seq OWNED BY public.scriptions._id;


--
-- Name: scriptions_song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scriptions_song_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scriptions_song_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scriptions_song_id_seq OWNED BY public.scriptions.song_id;


--
-- Name: scriptions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scriptions_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scriptions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scriptions_user_id_seq OWNED BY public.scriptions.user_id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    _id integer NOT NULL,
    title character varying(40) NOT NULL,
    artist character varying(40),
    genre character varying(30),
    year smallint,
    age_restrict boolean
);


--
-- Name: songs__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.songs__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.songs__id_seq OWNED BY public.songs._id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    _id integer NOT NULL,
    username character varying(30),
    password character varying(30),
    birthdate date
);


--
-- Name: users__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users__id_seq OWNED BY public.users._id;


--
-- Name: comments _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN _id SET DEFAULT nextval('public.comments__id_seq'::regclass);


--
-- Name: comments user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN user_id SET DEFAULT nextval('public.comments_user_id_seq'::regclass);


--
-- Name: comments scription_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN scription_id SET DEFAULT nextval('public.comments_scription_id_seq'::regclass);


--
-- Name: folders _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders ALTER COLUMN _id SET DEFAULT nextval('public.folders__id_seq'::regclass);


--
-- Name: folders user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders ALTER COLUMN user_id SET DEFAULT nextval('public.folders_user_id_seq'::regclass);


--
-- Name: likes _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN _id SET DEFAULT nextval('public.likes__id_seq'::regclass);


--
-- Name: likes user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN user_id SET DEFAULT nextval('public.likes_user_id_seq'::regclass);


--
-- Name: likes scription_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN scription_id SET DEFAULT nextval('public.likes_scription_id_seq'::regclass);


--
-- Name: scriptions _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions ALTER COLUMN _id SET DEFAULT nextval('public.scriptions__id_seq'::regclass);


--
-- Name: scriptions user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions ALTER COLUMN user_id SET DEFAULT nextval('public.scriptions_user_id_seq'::regclass);


--
-- Name: scriptions song_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions ALTER COLUMN song_id SET DEFAULT nextval('public.scriptions_song_id_seq'::regclass);


--
-- Name: songs _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs ALTER COLUMN _id SET DEFAULT nextval('public.songs__id_seq'::regclass);


--
-- Name: users _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN _id SET DEFAULT nextval('public.users__id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (_id, user_id, scription_id, "timestamp", text) FROM stdin;
1	2	1	2021-01-09 23:57:25-05	This is great, thank you!
8	3	1	2021-01-09 23:58:25-05	lol that title is hilarious
9	4	1	2021-01-09 23:59:25-05	I think the first note in the third measure might be wrong.
10	4	4	2021-01-14 11:33:16.369987-05	Is this ridiculous transposition really necessary?
11	4	4	2021-01-14 11:43:18.144436-05	I mean, just look at that key signature.
12	3	4	2021-01-14 11:45:54.157346-05	Don't be so negative. It's a free country, they can play the song however they want.
13	3	1	2021-01-14 12:02:21.707642-05	Ignore chronicsplainer. It's perfect.
15	2	1	2021-01-14 13:40:26.591713-05	Thank you!
22	1	4	2021-01-14 13:58:30.986354-05	Oof, I don't know if I can play this one.
24	1	9	2021-01-17 17:32:47.56671-05	fcdcfvtgb
\.


--
-- Data for Name: folders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.folders (_id, user_id, name, private, color) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (_id, user_id, scription_id) FROM stdin;
1	1	1
8	1	4
10	1	4
11	1	4
12	1	4
13	1	4
18	3	1
19	3	4
21	6	1
22	6	9
\.


--
-- Data for Name: scriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scriptions (_id, user_id, "timestamp", song_id, abc) FROM stdin;
1	1	2021-01-09 23:54:25-05	1	X: 7\nT:Oh, Those Britches Full Of Stitches\nM:2/4\nL:1/8\nR:Polka\nK:A\nA>B cA|BA cA|A>B cA|BA F2|\nA>B cA|BA ce|A>B AF|FE E2:|\n|:e>f ec|BA Bc|e>f ec|BA F2|\ne>f ec|BA ce|A>B AF|FE E2:|
4	2	2021-01-14 00:14:55-05	2	T:Diamonds are Forever\nC:John Barry\nM:4/4\nL:1/8\nQ:100 =1/4\nK:C#\nA,/5A/5E/5C3/5 A A4/5 A,/5A4/5 A,/5A e/5c8/5 A,/5A4/5 | A,/5A e/5c9/5 A, A,2 C, A,4/5 |\n=B,/5d/5A/5F3/5 d d4/5 =B,/5d4/5 =B,/5e2 f/5d/5A7/5 | =A,/5b/5f/5d/5B7/5 z3 B, C, =A,4/5 |\nA,/5A/5E/5C3/5 A A4/5 A,/5A4/5 A,/5A/5E/5C3/5 e/5c/5A8/5 A, | A,2 c/5A4/5 A,4/5 A,/5f9/5 C,/5e/5c/5A3/5 A,4/5 |
9	2	2021-01-17 17:32:17-05	\N	T: Title\nM: Meter, e.g. 4/4\nL: 1/4\nK: Key, e.g. "A" for A major or "Am" for A minor\nC: Composer or artist\nQ: Beats per minute (optional)\nR: Rhythm (optional)\nG, A, B, C | D e F G | A B c d | e f g a | b c' d' e' | f'2 g'2 ||\nG,3 z | A, B, C2 | D4 |E1/2F1/2 G1/2A1/2 A1/2G1/2 F1/2E1/2 | d c d e1/4f1/4g1/4a1/4 | b c' d' e' | f'2 g'2 |]
10	2	2021-01-17 17:32:32-05	\N	T: Title\nM: Meter, e.g. 4/4\nL: 1/4\nK: Key, e.g. "A" for A major or "Am" for A minor\nC: Composer or artist\nQ: Beats per minute (optional)\nR: Rhythm (optional)\nG, A, B, C | D e F G | A B c d | e f g a | b c' d' e' | f'2 g'2 ||\nG,3 z | A, B, C2 | D4 |E1/2F1/2 G1/2A1/2 A1/2G1/2 F1/2E1/2 | d c d e1/4f1/4g1/4a1/4 | b c' d' e' | f'2 g'2 |]
11	2	2021-01-17 21:12:23-05	\N	T: When the Saints Go Marching In\nM: 4/4\nL: 1/4\nK: G\nR: Moderato\nC: Louis Armstrong\nG B C' | D'4-|D' G B C' D'4-|D'  G B C' | D'2 B2 | G2 B2 | A4-|A B2 A | G3 G || \nB2 D' D' | D' C'3-|C'2 B C'| D'2 B2 | G2 A2 | G4-|G1 |]
12	2	2021-01-17 21:12:49-05	\N	T: When the Saints Go Marching In\nM: 4/4\nL: 1/4\nK: G\nR: Moderato\nC: Louis Armstrong\nG B C' | D'4-|D' G B C' D'4-|D'  G B C' | D'2 B2 | G2 B2 | A4-|A B2 A | G3 G || \nB2 D' D' | D' C'3-|C'2 B C'| D'2 B2 | G2 A2 | G4-|G1 |]
13	2	2021-01-17 21:13:06-05	\N	T: When the Saints Go Marching In\nM: 4/4\nL: 1/4\nK: G\nR: Moderato\nC: Louis Armstrong\nG B C' | D'4-|D' G B C' D'4-|D'  G B C' | D'2 B2 | G2 B2 | A4-|A B2 A | G3 G || \nB2 D' D' | D' C'3-|C'2 B C'| D'2 B2 | G2 A2 | G4-|G1 |]
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (_id, title, artist, genre, year, age_restrict) FROM stdin;
1	Oh, Those Britches Full Of Stitches	\N	folk	\N	\N
2	Diamonds Are Forever	John Barry	movie music	1971	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (_id, username, password, birthdate) FROM stdin;
1	brent	brentpass	1994-05-02
2	furiousfiddler	password	1993-12-29
3	doglover123	password	1996-01-14
4	chronicsplainer	password	1986-03-20
6	fluffyflautist	password	1994-12-28
\.


--
-- Name: comments__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments__id_seq', 24, true);


--
-- Name: comments_scription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_scription_id_seq', 1, false);


--
-- Name: comments_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_user_id_seq', 1, false);


--
-- Name: folders__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.folders__id_seq', 1, false);


--
-- Name: folders_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.folders_user_id_seq', 1, false);


--
-- Name: likes__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes__id_seq', 22, true);


--
-- Name: likes_scription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_scription_id_seq', 1, false);


--
-- Name: likes_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_user_id_seq', 1, false);


--
-- Name: scriptions__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scriptions__id_seq', 13, true);


--
-- Name: scriptions_song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scriptions_song_id_seq', 1, false);


--
-- Name: scriptions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scriptions_user_id_seq', 1, false);


--
-- Name: songs__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs__id_seq', 2, true);


--
-- Name: users__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users__id_seq', 2, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (_id);


--
-- Name: folders folders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (_id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (_id);


--
-- Name: scriptions scriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions
    ADD CONSTRAINT scriptions_pkey PRIMARY KEY (_id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- Name: comments comments_scription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_scription_id_fkey FOREIGN KEY (scription_id) REFERENCES public.scriptions(_id);


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id);


--
-- Name: folders folders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT folders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id);


--
-- Name: likes likes_scription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_scription_id_fkey FOREIGN KEY (scription_id) REFERENCES public.scriptions(_id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id);


--
-- Name: scriptions scriptions_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions
    ADD CONSTRAINT scriptions_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(_id);


--
-- Name: scriptions scriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scriptions
    ADD CONSTRAINT scriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(_id);


--
-- PostgreSQL database dump complete
--

