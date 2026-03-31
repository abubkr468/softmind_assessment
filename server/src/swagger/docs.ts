/**
 * @openapi
 * /api/cache/greet:
 *   get:
 *     tags: [Cache]
 *     summary: Cached greeting using Redis
 *     parameters:
 *       - in: query
 *         name: name
 *         schema: { type: string }
 *       - in: query
 *         name: ttl
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Greeting response
 */

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Create user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [Admin, Manager, User] }
 *     responses:
 *       201:
 *         description: User created with token
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Auth token and user
 */

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current authenticated user
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout current user
 *     responses:
 *       200:
 *         description: Logged out
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: List users (Admin/Manager only)
 *     responses:
 *       200:
 *         description: User list
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               assignedTo: { type: string }
 *               status: { type: string, enum: [Pending, InProgress, Completed] }
 *               priority: { type: string, enum: [Low, Medium, High] }
 *               dueDate: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Task created
 *   get:
 *     tags: [Tasks]
 *     summary: Filter tasks
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [Pending, InProgress, Completed] }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [Low, Medium, High] }
 *       - in: query
 *         name: assignedTo
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Task list
 */

/**
 * @openapi
 * /api/tasks/{taskId}/assign:
 *   patch:
 *     tags: [Tasks]
 *     summary: Assign task to user
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [assignedTo]
 *             properties:
 *               assignedTo: { type: string }
 *     responses:
 *       200:
 *         description: Task assigned
 */

/**
 * @openapi
 * /api/tasks/{taskId}/status:
 *   patch:
 *     tags: [Tasks]
 *     summary: Update task status
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [Pending, InProgress, Completed] }
 *     responses:
 *       200:
 *         description: Task status updated
 */

/**
 * @openapi
 * /api/tasks/{taskId}/attachments:
 *   post:
 *     tags: [Tasks]
 *     summary: Upload task image attachment to Cloudinary
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Attachment uploaded and saved on task
 */

export {};

