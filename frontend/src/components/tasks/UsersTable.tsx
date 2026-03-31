import type { UserSummary } from '../../api/users'

type UsersTableProps = {
  users: UserSummary[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5">
      <h2 className="text-sm font-semibold text-slate-900">All users</h2>
      <p className="mt-1 text-xs text-slate-500">
        Overview of every account in the workspace, including their role.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                Name
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                Email
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80">
                  <td className="px-3 py-2 text-slate-900">{user.name}</td>
                  <td className="px-3 py-2 text-slate-700">{user.email}</td>
                  <td className="px-3 py-2">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

