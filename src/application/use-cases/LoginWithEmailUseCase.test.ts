import { describe, it, expect, vi } from 'vitest';
import { LoginWithEmailUseCase } from './LoginWithEmailUseCase';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('LoginWithEmailUseCase', () => {
  it('should call authRepository.loginWithEmail and return user', async () => {
    const mockAuthRepo: AuthRepository = {
      loginWithEmail: vi.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
      signUpWithEmail: vi.fn(),
    };
    
    const useCase = new LoginWithEmailUseCase(mockAuthRepo);
    const result = await useCase.execute('test@test.com', 'password123');
    
    expect(mockAuthRepo.loginWithEmail).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(result).toEqual({ id: '1', email: 'test@test.com' });
  });
});
